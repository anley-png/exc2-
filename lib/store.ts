import {create} from "zustand";import {immer} from "zustand/middleware/immer";
type S={cells:Record<string,string>;sel:string;editing:boolean;past:string[];future:string[];panel:string|null;
 select:(k:string)=>void;setCell:(k:string,v:string)=>void;setEditing:(b:boolean)=>void;undo:()=>void;redo:()=>void;openPanel:(p:string|null)=>void};
export const useSheet=create<S>()(immer((set)=>({
 cells:{A1:"Item",B1:"Qty",C1:"Price",D1:"Total",A2:"Alif",B2:"3",C2:"2.5",D2:"=B2*C2",A3:"Ba",B3:"5",C3:"1.2",D3:"=B3*C3",A4:"Ta",B4:"8",C4:"0.75",D4:"=B4*C4",A6:"Sum",D6:"=SUM(D2:D4)"},
 sel:"A1",editing:false,past:[],future:[],panel:null,
 select:k=>set(s=>{s.sel=k;s.editing=false}),
 setCell:(k,v)=>set(s=>{s.past.push(JSON.stringify(s.cells));s.future=[];if(v==="")delete s.cells[k];else s.cells[k]=v;s.editing=false}),
 setEditing:b=>set(s=>{s.editing=b}),
 undo:()=>set(s=>{const p=s.past.pop();if(p){s.future.push(JSON.stringify(s.cells));s.cells=JSON.parse(p)}}),
 redo:()=>set(s=>{const p=s.future.pop();if(p){s.past.push(JSON.stringify(s.cells));s.cells=JSON.parse(p)}}),
 openPanel:p=>set(s=>{s.panel=p})})));
