"use client";
import {useState} from "react";import {useSheet} from "@/lib/store";import {evaluate,colName,colIdx} from "@/lib/formula";
const COLS=52,ROWS=1000,W=80,H=24,HW=48;
export default function Grid(){
 const {cells,sel,editing,select,setCell,setEditing}=useSheet();const [top,setTop]=useState(0);const [draft,setDraft]=useState("");
 const first=Math.floor(top/H),rows=Array.from({length:40},(_,i)=>first+i+1).filter(r=>r<=ROWS),cache:Record<string,any>={};
 const move=(dc:number,dr:number)=>{const m=sel.match(/([A-Z]+)(\d+)/)!;select(colName(Math.max(0,Math.min(COLS-1,colIdx(m[1])+dc)))+Math.max(1,Math.min(ROWS,+m[2]+dr)))};
 const key=(e:React.KeyboardEvent)=>{
  if(editing){if(e.key==="Enter"){setCell(sel,draft);move(0,1)}else if(e.key==="Escape")setEditing(false);else if(e.key==="Tab"){e.preventDefault();setCell(sel,draft);move(1,0)}return}
  const mv:Record<string,[number,number]>={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],Tab:[1,0],Enter:[0,1]};
  if(e.ctrlKey&&e.key==="z"){useSheet.getState().undo();return}if(e.ctrlKey&&e.key==="y"){useSheet.getState().redo();return}
  if(mv[e.key]){e.preventDefault();move(...mv[e.key])}else if(e.key==="Delete")setCell(sel,"");
  else if(e.key==="F2"){setDraft(cells[sel]??"");setEditing(true)}else if(e.key.length===1&&!e.ctrlKey){setDraft(e.key);setEditing(true)}};
 return <div tabIndex={0} onKeyDown={key} onScroll={e=>setTop(e.currentTarget.scrollTop)} className="flex-1 overflow-auto relative bg-white outline-none">
  <div style={{height:ROWS*H+H,width:COLS*W+HW}} className="relative">
   <div className="sticky top-0 z-20 flex bg-gray-100" style={{height:H}}><div style={{width:HW}} className="sticky left-0 bg-gray-100 border shrink-0"/>{Array.from({length:COLS},(_,c)=><div key={c} style={{width:W}} className="border text-center text-xs leading-6 shrink-0">{colName(c)}</div>)}</div>
   {rows.map(r=><div key={r} className="flex absolute" style={{top:r*H}}><div style={{width:HW,height:H}} className="sticky left-0 z-10 bg-gray-100 border text-xs text-center leading-6 shrink-0">{r}</div>
    {Array.from({length:COLS},(_,c)=>{const k=colName(c)+r,isSel=k===sel;const v=evaluate(cells,k,[],cache);
     return <div key={k} onMouseDown={()=>select(k)} onDoubleClick={()=>{setDraft(cells[k]??"");setEditing(true)}} style={{width:W,height:H}} role="gridcell" aria-label={k}
      className={`border border-gray-200 text-sm px-1 overflow-hidden whitespace-nowrap shrink-0 ${typeof v==="number"?"text-right":""} ${isSel?"outline outline-2 outline-[#217346] z-10 relative":""}`}>
      {isSel&&editing?<input autoFocus value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(["Enter","Tab","Escape"].includes(e.key)){e.stopPropagation();key(e as any)}}} className="absolute inset-0 px-1 outline-none bg-white"/>:String(v)}</div>})}</div>)}
  </div></div>}
