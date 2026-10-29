export const colName=(i:number)=>{let s="";i++;while(i){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};
export const colIdx=(s:string)=>s.split("").reduce((a,c)=>a*26+c.charCodeAt(0)-64,0)-1;
type Cells=Record<string,string>;
const flat=(a:any[]):any[]=>a.flatMap(x=>Array.isArray(x)?flat(x):[x]);
const nums=(a:any[])=>flat(a).filter(x=>typeof x==="number");
const crit=(c:any)=>{if(typeof c!=="string")return(v:any)=>v===c;const m=c.match(/^(<=|>=|<>|<|>|=)?(.*)$/)!;const n=parseFloat(m[2]);const op=m[1]||"=";return(v:any)=>{const x=isNaN(n)?m[2]:n;switch(op){case"<":return v<x;case">":return v>x;case"<=":return v<=x;case">=":return v>=x;case"<>":return v!=x;default:return v==x}}};
const F:Record<string,(...a:any[])=>any>={
SUM:(...a)=>nums(a).reduce((x,y)=>x+y,0),AVERAGE:(...a)=>{const n=nums(a);if(!n.length)throw"#DIV/0!";return n.reduce((x,y)=>x+y,0)/n.length},
COUNT:(...a)=>nums(a).length,MIN:(...a)=>Math.min(...nums(a)),MAX:(...a)=>Math.max(...nums(a)),
IF:(c,a,b=false)=>c?a:b,IFERROR:(a,b)=>a,AND:(...a)=>flat(a).every(Boolean),OR:(...a)=>flat(a).some(Boolean),NOT:(a)=>!a,
ABS:Math.abs,SQRT:Math.sqrt,POWER:Math.pow,INT:Math.floor,MOD:(a,b)=>a%b,ROUND:(a,d=0)=>Math.round(a*10**d)/10**d,
ROUNDUP:(a,d=0)=>Math.ceil(a*10**d)/10**d,ROUNDDOWN:(a,d=0)=>Math.floor(a*10**d)/10**d,
LEN:(s)=>String(s).length,UPPER:(s)=>String(s).toUpperCase(),LOWER:(s)=>String(s).toLowerCase(),TRIM:(s)=>String(s).trim(),
LEFT:(s,n=1)=>String(s).slice(0,n),RIGHT:(s,n=1)=>String(s).slice(-n),MID:(s,a,n)=>String(s).substr(a-1,n),
CONCAT:(...a)=>flat(a).join(""),CONCATENATE:(...a)=>flat(a).join(""),TEXTJOIN:(d,_i,...a)=>flat(a).join(d),
TODAY:()=>Math.floor(Date.now()/864e5)+25569,NOW:()=>Date.now()/864e5+25569,RAND:Math.random,RANDBETWEEN:(a,b)=>a+Math.floor(Math.random()*(b-a+1)),
ISNUMBER:(a)=>typeof a==="number",ISTEXT:(a)=>typeof a==="string"&&a!=="",ISBLANK:(a)=>a===""||a==null,
LARGE:(r,k)=>nums([r]).sort((a,b)=>b-a)[k-1],SMALL:(r,k)=>nums([r]).sort((a,b)=>a-b)[k-1],
COUNTIF:(r,c)=>flat([r]).filter(crit(c)).length,SUMIF:(r,c,s=r)=>{const f=crit(c),sr=flat([s]);return flat([r]).reduce((t,v,i)=>f(v)&&typeof sr[i]==="number"?t+sr[i]:t,0)},
VLOOKUP:(v,t:any[][],c,_x=true)=>{const r=t.find(r=>r[0]==v);if(!r)throw"#N/A";return r[c-1]},
INDEX:(t:any[][],r,c=1)=>t[r-1][c-1],MATCH:(v,r)=>{const i=flat([r]).indexOf(v);if(i<0)throw"#N/A";return i+1},
};
export function evaluate(cells:Cells,key:string,stack:string[]=[],cache:Record<string,any>={}):any{
 if(key in cache)return cache[key];
 const raw=cells[key]??"";
 if(!raw.startsWith("=")){const n=Number(raw);return cache[key]=raw!==""&&!isNaN(n)?n:raw}
 if(stack.includes(key))return"#REF!";
 const C=(k:string)=>{const v=evaluate(cells,k,[...stack,key],cache);if(typeof v==="string"&&v.startsWith("#"))throw v;return v===""?0:v};
 const R=(a:string,b:string)=>{const [,c1,r1]=a.match(/([A-Z]+)(\d+)/)!,[,c2,r2]=b.match(/([A-Z]+)(\d+)/)!;const out:any[][]=[];
  for(let r=+r1;r<=+r2;r++){const row:any[]=[];for(let c=colIdx(c1);c<=colIdx(c2);c++){row.push(evaluate(cells,colName(c)+r,[...stack,key],cache))}out.push(row)}return out};
 try{
  let src=raw.slice(1).replace(/\$/g,"").replace(/\^/g,"**").replace(/<>/g,"!=").replace(/(?<![<>!=])=(?!=)/g,"==").replace(/&/g,"+");
  src=src.replace(/\b([A-Z]{1,3}\d+):([A-Z]{1,3}\d+)\b/g,'R("$1","$2")').replace(/(?<![A-Za-z"(])\b([A-Z]{1,3}\d+)\b(?!["(])/g,'C("$1")');
  const names=Object.keys(F);
  for(const m of src.matchAll(/\b([A-Z][A-Z0-9.]*)\(/g))if(!names.includes(m[1])&&m[1]!=="R"&&m[1]!=="C")return cache[key]="#NAME?";
  const v=new Function("R","C",...names,`return (${src})`)(R,C,...names.map(n=>F[n]));
  if(typeof v==="number"&&!isFinite(v))return cache[key]="#DIV/0!";
  return cache[key]=v;
 }catch(e:any){return cache[key]=typeof e==="string"&&e.startsWith("#")?e:"#VALUE!"}
}
