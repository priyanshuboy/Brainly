import { SecondBrainIcon } from "../icon/Brainicon";
import { Twittericon } from "../icon/twitter";
import { Youtubeicon } from "../icon/youtubeicon";
import { Sidebaritem } from "./sidebaritem";


export function Sidebar(){
    
    return <div className="bg-white w-72 h-screen border-r fixed top-0 left-0 shadow-lg border border-black/10 pt-10">
     
     
     <div className="flex pl-4 gap-2 pb-10">
   <div className="pr-1 text-[#BF00FF]">
        <SecondBrainIcon/>
         </div>
             <div className="font-bold text-xl flex">
          <h1>Second Brain</h1>
      
     </div>  
     </div>

          <div className="pl-8">
    <Sidebaritem text="Twitter" icon={<Twittericon/>}/>
    <Sidebaritem text="Youtube" icon={<Youtubeicon/>}/>         
          </div>
   
    </div>
}