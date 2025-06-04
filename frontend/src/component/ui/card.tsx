import { Documenticon } from "../icon/Document";
import { Shareicon } from "../icon/Shareicon";
import { Trashicon } from "../icon/trash";

interface CardProps {
    title : string ,
    link : string,
    type : "twitter" | "youtube"

}

export function Card(props : CardProps){
   
    return <div>
    <div className="max-w-72 p-8 my-10 mx-10 border shadow-md rounded-md bg-white border-slate-200 min-h-48"> 
      
        <div className="flex justify-between items-center"> <div className="flex gap-3 items-center">
            <div className="text-slate-600"><Documenticon/></div> <div className="font-normal">{props.title}</div></div> 
            <div className="flex gap-7 text-slate-500 translate-y-1 cursor-pointer"><a href={props.link} target="_blank"><Shareicon/></a><div className="-translate-y-1"><Trashicon/></div></div> 
            </div>
          
            <div className="pt-4">
           {props.type==='youtube' && 
            <iframe className="w-full" width="560" height="315" 
            src={props.link.replace("watch" ,"embed").replace('?v=' ,'/')} 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
           }          
              {props.type === 'twitter' && 
              <blockquote className="twitter-tweet">
              <a href={props.link.replace('x.com' , 'twitter.com')}></a> 
              </blockquote>  }      
                
            </div> 
              

         
    </div>
 </div>

}