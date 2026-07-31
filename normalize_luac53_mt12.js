const fs=require('fs');
const [,,i,o]=process.argv;if(!i||!o)process.exit(2);let b=fs.readFileSync(i);
if(b.length<18||b[0]!==0x1b||b.toString('ascii',1,4)!=='Lua'||b[4]!==0x53)throw Error('not Lua 5.3');
let p=12;b[p]=4;b[p+1]=4;b[p+2]=4;b[p+3]=4;b[p+4]=4;b[p+5]=4;
fs.writeFileSync(o,b);
