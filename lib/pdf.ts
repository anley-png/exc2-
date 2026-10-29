import {PDFDocument,StandardFonts} from "pdf-lib";import {evaluate,colName} from "./formula";
export async function createPdf(cells:Record<string,string>){
 const d=await PDFDocument.create(),p=d.addPage([842,595]),f=await d.embedFont(StandardFonts.Helvetica),cache={};
 for(let r=1;r<=30;r++)for(let c=0;c<10;c++){const k=colName(c)+r;if(cells[k]!==undefined)p.drawText(String(evaluate(cells,k,[],cache)),{x:30+c*80,y:560-r*16,size:9,font:f})}
 const b=await d.save();const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([b as BlobPart],{type:"application/pdf"}));a.download="arabicletterv2.pdf";a.click()}
