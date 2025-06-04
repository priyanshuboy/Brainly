


import { useState } from 'react'
import '../App.css'
import { Plusicon } from '../component/icon/plusicon'
import { Shareicon } from '../component/icon/Shareicon'
import { Addcontent } from '../component/ui/AddContent'
import { Button } from '../component/ui/button'
import { Card } from '../component/ui/card'
import { Sidebar } from '../component/ui/sidebar'

export function Dashboard() {

const [isModelopen , setModel] =useState(false)
  return (
       
<><div>

<Sidebar/>

</div>

<div className='p-4 ml-72 bg-[#f7f9fb] h-screen'>
 
  
 <Addcontent Open={isModelopen} OnClose={()=>{
  setModel(false)
 }}/>
 <div className=' flex justify-end gap-3 pt-2 -translate-x-3' >
 <Button onClick={()=>{
  setModel(true)
 }} text='Add Content' variant='primary' starticon={<Plusicon/>}/>
 <Button text='Share Brain' variant='secondary' starticon={<Shareicon/>}/>
 </div>
 <div className='flex'>
 <Card type='twitter' link='https://x.com/elonmusk/status/1929954109689606359' title='Elon musk'/>
  <Card type='youtube' link='https://www.youtube.com/watch?v=81UhS9wMnXg' title='good video'/>
</div>
</div>
</>



  )
}

export default Dashboard


