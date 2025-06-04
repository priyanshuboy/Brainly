import type { ReactElement } from "react"


export function Sidebaritem({text ,icon} : {
    text : string, 
    icon : ReactElement
}){
   
    return (
     
         <div className="flex cursor-pointer hover:bg-[#dce4fb] max-w-48 rounded hover:scale-110 delay-100 duration-500">
         
         <div className="p-2">
{icon}
         </div>
         <div className="p-2 text-[#9d9d9f] "> {text} </div>
              
     
         </div>

    )

}