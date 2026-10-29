"use client";
import {useSheet} from "@/lib/store";import {createPdf} from "@/lib/pdf";
export const TABS=["File","Home","WPS PDF","Insert","Draw","Page Layout","Formulas","Data","Review","View","Automate","Help","Acrobat"];
export const RIBBON:Record<string,Record<string,string[]>>={
 "Home":{Clipboard:["Paste","Cut","Copy","Format Painter"],Font:["Font","Size","Bold","Italic","Underline","Borders","Fill","Font Color"],Alignment:["Top","Middle","Bottom","Left","Center","Right","Wrap Text","Merge & Center"],Number:["General","Accounting","%","Comma",".0←",".00→"],Styles:["Conditional Formatting","Format as Table","Cell Styles"],Cells:["Insert","Delete","Format"],Editing:["AutoSum","Fill","Clear","Sort & Filter","Find & Select"],More:["Templates","AI Data Analysis","Export Image","Split / Merge","Create PDF","Sign","Sensitivity","Add-ins","Acrobat"]},
 "WPS PDF":{"Create PDF":["Create PDF","Create & Play","Create & Share"],"WPS PDF Tools":["Sign","PDF Split","PDF Merge","Crop Pages","PDF Compress","Erase","Draw Shapes"],"WPS PDF Convert":["PDF to Word","PDF to Excel","PDF to PPT","Image-only PDF","PDF to Image","OCR PDF"],Settings:["Keep Document Attributes"],More:["More"]},
 "Insert":{Tables:["PivotTable","Recommended PivotTables","Table","Forms"],Illustrations:["Pictures","Shapes","Icons","3D Models","SmartArt","Screenshot"],Controls:["Checkbox"],Charts:["Recommended Charts","Maps","PivotChart","Column","Line","Pie","Bar","Area","Scatter"],Sparklines:["Line","Column","Win/Loss"],Filters:["Slicer","Timeline"],Links:["Link"],Comments:["Comment"],Symbols:["Equation","Symbol"]},
 "Draw":{Undo:["Undo","Redo"],Tools:["Select","Lasso","Gray Highlighter","Black Pen","Red Pen","Pencil","Yellow Highlighter","Blue Pen","Green Pen","Add Pen"],Convert:["Ink to Shape","Ink to Math"],Replay:["Ink Replay"],Help:["Ink Help"]},
 "Page Layout":{Themes:["Themes","Margins","Orientation","Size","Print Area"],"Scale/Sheet":["Scale to Fit","Gridlines","Headings","Background","Print Titles"]},
 "Formulas":{Library:["Insert Function","AutoSum","Recently Used","Financial","Logical","Text","Date & Time","Lookup","Math & Trig","More"],Names:["Name Manager","Define Name"],Auditing:["Trace Precedents","Trace Dependents","Show Formulas","Error Checking","Evaluate Formula","Watch Window"],Calculation:["Calculation Options","Calculate Now","Calculate Sheet"]},
 "Data":{"Get & Transform":["From Text/CSV","From Web","From JSON"],Sort:["Sort A-Z","Sort Z-A","Sort","Filter"],Tools:["Data Validation","Consolidate","What-If Analysis","Remove Duplicates","Text to Columns","Flash Fill","Group","Subtotal","Forecast Sheet"]},
 "Review":{Proofing:["Spelling","Thesaurus","Word Count"],Language:["Translate"],Comments:["New Comment","Notes"],Protect:["Protect Sheet","Protect Workbook","Share Workbook","Allow Edit Ranges"]},
 "View":{Views:["Normal","Page Break Preview","Page Layout"],Show:["Ruler","Gridlines","Formula Bar","Headings"],Zoom:["Zoom","100%","Zoom to Selection"],Window:["New Window","Arrange All","Freeze Panes","Split","Hide","Unhide"],Macros:["Macros"]},
 "Automate":{Scripts:["Record Actions","All Scripts","New Script","Power Automate"]},
 "Help":{Help:["Help","Show Training","What's New","Contact Support","Feedback"]},
 "Acrobat":{Acrobat:["Create PDF","Export with Bookmarks","Send for Signature"]}};
export default function Ribbon({tab}:{tab:string}){
 const {openPanel,cells,undo,redo}=useSheet();
 const run=async(b:string)=>{if(b==="Create PDF"||b==="Create & Share")await createPdf(cells);else if(b==="Undo")undo();else if(b==="Redo")redo();else openPanel(b)};
 const g=RIBBON[tab]??{};
 return <div className="flex bg-[#f3f3f3] border-b h-24 overflow-x-auto text-xs">{Object.entries(g).map(([n,bs])=>
  <div key={n} className="flex flex-col border-r px-2 min-w-fit"><div className="flex flex-wrap gap-1 flex-1 content-start pt-1 max-w-[420px]">{bs.map(b=>
   <button key={b} title={b} onClick={()=>run(b)} className="px-2 py-1 hover:bg-gray-200 rounded">{b}</button>)}</div><div className="text-center text-gray-500">{n}</div></div>)}</div>}
