const fs=require('node:fs');const path=require('node:path');const http=require('node:http');const {spawn}=require('node:child_process');const {once}=require('node:events');
const {chromium}=require('playwright');const sharp=require('sharp');
const temp=process.env.GOSLING_RENDER_DIR||'/tmp/gosling-showcase/monitor';const output=path.resolve('public/assets/gosling');
(async()=>{fs.mkdirSync(temp,{recursive:true});fs.copyFileSync(path.join(__dirname,'monitor-film.html'),path.join(temp,'index.html'));
fs.copyFileSync(path.join(__dirname,'three.module.js'),path.join(temp,'three.module.js'));
await sharp(path.join(__dirname,'studio.png')).resize(1920,1080,{fit:'cover'}).webp({quality:94}).toFile(path.join(temp,'studio.webp'));
for(const [src,dest]of [['hero.png','screen-home.png'],['projects.png','screen-projects.png']])await sharp(path.join(__dirname,src)).extract({left:0,top:0,width:1440,height:900}).png().toFile(path.join(temp,dest));
const server=http.createServer((req,res)=>{const file=path.join(temp,req.url==='/'?'index.html':req.url.split('?')[0]);if(!file.startsWith(temp)||!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':file.endsWith('.webp')?'image/webp':'image/png');fs.createReadStream(file).pipe(res);});server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||'/Users/john/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',headless:true,args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}});page.on('pageerror',e=>console.error(e));await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.ready,{},{timeout:60000});
for(const t of [0,3,8,13,19,21.9]){const b=await page.evaluate(t=>window.renderFrame(t),t);fs.writeFileSync(path.join(temp,`proof-${t}.jpg`),Buffer.from(b,'base64'));}
if(process.argv.includes('--proof')){await browser.close();server.close();return;}
const target=path.join(output,'gosling-monitor-film.mp4');const enc=spawn(process.env.FFMPEG,['-y','-hide_banner','-loglevel','error','-f','image2pipe','-framerate','60','-c:v','mjpeg','-i','pipe:0','-vf','fade=t=in:st=0:d=0.35,fade=t=out:st=21.5:d=0.5','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart','-an',target],{stdio:['pipe','inherit','inherit']});
const completed=once(enc,'close');for(let n=0;n<1320;n++){const b=Buffer.from(await page.evaluate(t=>window.renderFrame(t),n/60),'base64');if(!enc.stdin.write(b))await once(enc.stdin,'drain');if(n%120===0)console.log(`${n}/1320 frames`);}enc.stdin.end();const [code]=await completed;if(code!==0)throw Error(`Encoder exited ${code}`);
await sharp(path.join(temp,'proof-3.jpg')).webp({quality:92}).toFile(path.join(output,'gosling-monitor-poster.webp'));await browser.close();server.close();console.log(`Finished: ${target}`);
})().catch(e=>{console.error(e);process.exit(1)});
