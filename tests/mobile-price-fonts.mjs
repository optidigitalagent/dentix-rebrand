import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const {chromium,webkit}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE_PATH).href);
const origin=process.env.DENTIX_PREVIEW_ORIGIN??'http://127.0.0.1:4181';
const rows=[];
for(const [engineName,engine] of Object.entries({chromium,webkit})){
 const browser=await engine.launch();
 try{
  const page=await browser.newPage();
  await page.route('**/api/public/booking/intake-status',r=>r.fulfill({json:{data:{lead:{enabled:false,mode:'UNAVAILABLE',policyUrl:null,consentVersion:''},timed:{enabled:false,mode:'UNAVAILABLE',policyUrl:null,consentVersion:''}}}}));
  await page.goto(`${origin}/price.html`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  for(const [width,height] of [[360,844],[375,812],[390,844],[393,852],[412,915],[430,932],[844,390],[768,900],[1024,900],[1440,900]]){
   await page.setViewportSize({width,height});
   const result=await page.evaluate(()=>{
    const fields=[...document.querySelectorAll('.lead-fields input,.lead-fields select,.lead-fields textarea')].map(e=>{
     const before=parseFloat(getComputedStyle(e).fontSize);e.focus();const focused=parseFloat(getComputedStyle(e).fontSize);e.blur();return{tag:e.tagName,type:e.type,before,focused};
    });
    return{fields,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
   });assert.ok(result.fields.length>=4);assert.ok(result.overflow<=1);if(width<=900)for(const field of result.fields)assert.ok(field.before>=16&&field.focused>=16);
   rows.push({engineName,width,height,...result});
  }
  console.log(`${engineName} Price fonts 10 viewports PASS`);
 }finally{await browser.close();}
}
await fs.writeFile('docs/qa/mobile-intake-2026-09-07/demo-price-fonts.json',JSON.stringify({origin,physicalDevice:false,rows},null,2));
