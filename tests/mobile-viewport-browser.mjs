import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const {chromium,webkit}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE_PATH).href);
const origin=process.env.DENTIX_PREVIEW_ORIGIN??'http://127.0.0.1:4179/dentix-rebrand';
const results=[];
for(const [name,engine] of Object.entries({chromium,webkit})){
 const browser=await engine.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  await page.route('**/api/public/**',r=>r.fulfill({json:{data:{lead:{enabled:false,mode:'UNAVAILABLE',policyUrl:null,consentVersion:'unavailable'},timed:{enabled:false,mode:'UNAVAILABLE',policyUrl:null,consentVersion:'unavailable'}}}}));
  await page.goto(`${origin}/price.html`,{waitUntil:'networkidle'});
  await page.locator('.lead-form').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  await page.locator('footer.footer').scrollIntoViewIfNeeded();await page.waitForTimeout(100);assert.equal(await page.locator('.mobile-call-bar').count(),0);
  await page.locator('.lead-form').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  await page.screenshot({path:`docs/qa/mobile-intake-2026-09-07/${name}-price390.png`});
  await page.getByRole('button',{name:'Записатися онлайн',exact:true}).first().click();
  const dialog=page.getByRole('dialog');await dialog.getByText('Заявка не резервує час прийому.').waitFor();await dialog.getByLabel('Телефон *',{exact:true}).focus();
  await page.evaluate(()=>{
   const v=visualViewport;Object.defineProperty(v,'height',{configurable:true,value:300});v.dispatchEvent(new Event('resize'));
  });
  const geometry=await dialog.evaluate(e=>{
   const layer=e.parentElement.getBoundingClientRect(),close=e.querySelector('.booking-icon-button').getBoundingClientRect(),body=e.querySelector('.booking-body');body.scrollTop=body.scrollHeight;
   return {height:e.getBoundingClientRect().height,layerHeight:layer.height,closeVisible:close.top>=layer.top&&close.bottom<=layer.bottom,scrollable:body.scrollHeight>body.clientHeight,bodyHeight:body.clientHeight};
  });assert.ok(geometry.height<=300&&geometry.closeVisible&&geometry.scrollable&&geometry.bodyHeight>0);
  await page.waitForTimeout(400);await page.screenshot({path:`docs/qa/mobile-intake-2026-09-07/${name}-simulated-keyboard300.png`});
  await page.evaluate(()=>{delete visualViewport.height;visualViewport.dispatchEvent(new Event('resize'));});
  await dialog.getByRole('button',{name:'Закрити',exact:true}).click();
  let intentionalScale=null;
  if(name==='chromium'){
   const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:2});
   const before=await page.evaluate(()=>visualViewport.scale);assert.ok(before>=1.95);
   await page.locator('.lead-form input').first().focus();await page.locator('.lead-form input').first().fill('Мар’ян');await page.locator('.lead-form input').first().blur();
   const after=await page.evaluate(()=>visualViewport.scale);assert.equal(after,before);intentionalScale={before,after,method:'Chromium CDP page scale emulation'};
   await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});await cdp.detach();
  }
  results.push({engine:name,geometry,intentionalScale,physicalDevice:false});console.log(`${name} simulated keyboard / footer / scale PASS`);
 }finally{await browser.close();}
}
await fs.writeFile('docs/qa/mobile-intake-2026-09-07/viewport-lifecycle.json',JSON.stringify({physicalDeviceVerification:'pending',results},null,2));
