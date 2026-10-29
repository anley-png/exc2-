"use client";
import {useState} from "react";import Grid from "./Grid";import Ribbon,{TABS} from "./Ribbon";import {useSheet} from "@/lib/store";import {evaluate} from "@/lib/formula";
export default function App(){
 const [tab,setTab]=useState("Home");const {sel,cells,panel,openPanel,setCell,undo,redo}=useSheet();
 return <div className="h-screen flex flex-col">
  <div className="bg-[#217346] text-white flex items-center gap-3 px-3 h-9 text-sm"><label>AutoSave <input type="checkbox"/></label><button title="Save">💾</button><button onClick={undo} title="Undo">↶</button><button onClick={redo} title="Redo">↷</button>
   <span className="mx-auto">arabicletterv2 — Saved to this PC</span><input placeholder="Search" className="text-black px-2 rounded h-6"/><button>Comments</button><button>Share</button><span className="w-7 h-7 rounded-full bg-white text-[#217346] text-xs flex items-center justify-center font-bold">AT</span></div>
  <div className="flex bg-[#f3f3f3] text-sm">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-3 py-1 ${tab===t?"border-b-2 border-[#217346] text-[#217346] font-semibold":""}`}>{t}</button>)}</div>
  <Ribbon tab={tab}/>
  <div className="flex items-center border-b h-7 text-sm"><div className="w-20 border-r px-2">{sel}</div><span className="px-2 italic">fx</span><input className="flex-1 outline-none px-1" value={cells[sel]??""} onChange={e=>setCell(sel,e.target.value)}/></div>
  <div className="flex flex-1 min-h-0"><Grid/>{panel&&<aside className="w-72 border-l p-3 text-sm bg-white"><div className="flex justify-between font-semibold">{panel}<button onClick={()=>openPanel(null)}>✕</button></div><p className="mt-2 text-gray-600">Panel stub for “{panel}”. Wire the feature here.</p></aside>}</div>
  <div className="h-6 bg-[#f3f3f3] border-t text-xs flex items-center gap-4 px-2"><span>Sheet1</span><button>＋</button><span className="ml-auto">Ready</span><span>Value: {String(evaluate(cells,sel))}</span></div></div>}
