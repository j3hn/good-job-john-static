// Rebuild with NODE_PATH pointing to a runtime containing sharp; FFMPEG to an H.264 encoder.
const sharp=require('sharp');
const fs=require('node:fs');const path=require('node:path');const {spawnSync}=require('node:child_process');
const out=path.resolve('public/assets/gosling');fs.mkdirSync(out,{recursive:true});
const svg=(body,w=1920,h=1200)=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#071a26"/><stop offset="1" stop-color="#194862"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#bg)"/>${body}</svg>`);
const text=(x,y,size,value,color='#ffffff',extra='')=>`<text x="${x}" y="${y}" font-family="Helvetica,Arial,sans-serif" font-size="${size}" fill="${color}" ${extra}>${value}</text>`;
const label=(n,title)=>text(90,80,19,`GOOD JOB, JOHN.   /   SELECTED WORK`,'#a8bdc9','letter-spacing="3"')+text(1830,80,19,n,'#a8bdc9','text-anchor="end"')+`<rect x="90" y="122" width="70" height="5" fill="#edb10c"/>`+text(90,209,68,title,'#fff','font-weight="600" letter-spacing="-2"');
async function screen(file,w,h){const b=await sharp(path.join(__dirname,file)).resize(w,h,{fit:'cover',position:'top'}).toBuffer();return sharp(b).composite([{input:Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="12" fill="white"/></svg>`),blend:'dest-in'}]).png().toBuffer();}
async function panel(file,x,y,w,h){return [{input:Buffer.from(`<svg width="${w+30}" height="${h+40}"><rect x="8" y="16" width="${w+8}" height="${h+8}" rx="18" fill="#000" opacity=".3"/></svg>`),left:x-10,top:y-8},{input:await screen(file,w,h),left:x,top:y}];}
(async()=>{
const cover=await sharp(svg(label('01 / WEBSITE','Gosling Group')+text(90,470,49,'Built on trust.')+text(90,530,49,'Designed for')+text(90,590,49,'connection.')+text(90,1060,22,'WEB DESIGN / RESPONSIVE DESIGN','#a8bdc9')+text(90,1120,22,'goslinggroup.com.au','#e6b31d'))).composite(await panel('hero.png',630,265,1180,820)).png().toBuffer();
const responsive=await sharp(svg(label('02 / RESPONSIVE','One identity. Every screen.')+text(90,1120,23,'Commercial and residential. Desktop and mobile.','#bcd0dc'))).composite([...await panel('hero.png',90,290,1230,770),...await panel('phone.png',1415,280,350,750)]).png().toBuffer();
const projects=await sharp(svg(label('03 / IN DETAIL','The work does the talking.')+text(90,1120,23,'Real projects. Practical expertise. A recognisable visual language.','#bcd0dc'))).composite(await panel('projects.png',275,270,1370,780)).png().toBuffer();
for(const [name,b]of [['cover',cover],['responsive',responsive],['projects',projects]]){await sharp(b).webp({quality:88}).toFile(`${out}/gosling-${name}.webp`);await sharp(b).resize(1920,1080,{fit:'contain',background:'#081d29'}).png().toFile(`/tmp/gosling-showcase/film-${name}.png`)}
const end=svg(text(960,330,22,'SELECTED WORK / GOOD JOB, JOHN.','#a8bdc9','text-anchor="middle" letter-spacing="4"')+text(960,520,112,'Gosling Group','#fff','text-anchor="middle" font-weight="600" letter-spacing="-3"')+`<rect x="922" y="578" width="76" height="5" fill="#edb10c"/>`+text(960,665,32,'Built on trust. Designed for connection.','#fff','text-anchor="middle"')+text(960,825,24,'goslinggroup.com.au','#bcd0dc','text-anchor="middle"'),1920,1080);
await sharp(end).png().toFile('/tmp/gosling-showcase/film-end.png');await sharp(cover).resize(1920,1080,{fit:'contain',background:'#081d29'}).webp({quality:88}).toFile(`${out}/gosling-film-poster.webp`);
if(!process.env.FFMPEG)process.exit(0);
const names=['cover','projects','responsive','end'];const args=['-y'];names.forEach(n=>args.push('-loop','1','-i',`/tmp/gosling-showcase/film-${n}.png`));
const filters=names.map((_,i)=>`[${i}:v]scale=1920:1080,zoompan=z='1.015+0.00022*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=158:s=1280x720:fps=24,trim=duration=6.583333,setpts=PTS-STARTPTS,fps=24,settb=AVTB,format=yuv420p[v${i}]`);
filters.push('[v0][v1]xfade=transition=fade:duration=0.75:offset=5.833333[a]','[a][v2]xfade=transition=fade:duration=0.75:offset=11.666666[b]','[b][v3]xfade=transition=fade:duration=0.75:offset=17.499999,fade=t=in:st=0:d=0.6,fade=t=out:st=23.45:d=0.63[out]');
args.push('-filter_complex',filters.join(';'),'-map','[out]','-t','24.083333','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart','-an',`${out}/gosling-showcase.mp4`);
const r=spawnSync(process.env.FFMPEG,args,{stdio:'inherit'});process.exit(r.status||0);
})();
