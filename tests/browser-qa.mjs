import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const modulePath = process.env.PLAYWRIGHT_MODULE_PATH;
if (!modulePath) throw new Error("PLAYWRIGHT_MODULE_PATH is required");
const { chromium } = await import(pathToFileURL(modulePath).href);
const origin = process.env.DENTIX_PREVIEW_ORIGIN ?? "http://localhost:4176/dentix-rebrand";

const browser = await chromium.launch({ headless: true });
const consoleErrors = [];

try {
  for (const width of [1440, 1024, 768, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: width >= 768 ? 900 : 844 } });
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(`${width}: ${message.text()}`);
    });
    await page.goto(`${origin}/`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(500);
    await assertNoOverflow(page, `patient-${width}`);
    await page.locator(".hero-actions button").click();
    await page.getByRole("dialog", { name: /Послуга/ }).waitFor();
    await page.getByText(/Онлайн-запис ще не підключено/).waitFor();
    assert.equal(await page.getByText(/DEVELOPMENT TEST/).count(), 0);
    await assertNoOverflow(page, `patient-drawer-${width}`);
    console.log(`patient disabled-state ${width}: PASS`);
    await page.close();
  }
} finally {
  await browser.close();
}

assert.deepEqual(consoleErrors, [], `Browser console errors:\n${consoleErrors.join("\n")}`);
console.log("Public browser QA complete: booking is safely disabled, with no overflow or console errors.");

async function assertNoOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  assert.ok(
    dimensions.scrollWidth <= dimensions.clientWidth + 1,
    `${label} horizontal overflow: ${JSON.stringify(dimensions)}`,
  );
}
