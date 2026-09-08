import assert from "node:assert/strict";
import test from "node:test";
import { hasServiceDuration } from "../src/lib/booking-duration.ts";
test("each service uses only its own confirmed positive duration", () => {
  for (const value of [30, 60, 150]) assert.equal(hasServiceDuration(value), true);
  for (const value of [null, undefined, 0, -30, 15.5, 481, NaN]) assert.equal(hasServiceDuration(value), false);
  const catalog = [{ name: "30 minute visit", duration: 30 }, { name: "Missing", duration: null }, { name: "150 minute visit", duration: 150 }];
  assert.deepEqual(catalog.filter((item) => hasServiceDuration(item.duration)).map((item) => item.name), ["30 minute visit", "150 minute visit"]);
});
