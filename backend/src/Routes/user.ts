
import express  from 'express';
import {z} from 'zod';
import {UserModel , UserContent, UserLinks} from '../Database/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {middleware} from '../middleware/Middleware'
import { AuthRequest } from '../middleware/Middleware';
import { RandomLinks } from '../utils';

const router = express.Router();
// Signup-endPoint
const app = express();
app.use(express.json());
 router.post('/signup' , async (req,res)=>{
  console.log("Received body:", req.body);
   try{ 
    const Userdetail = z.object({
       email : z.string().max(30).min(3).email(),
       password : z.string().max(30).min(3)
    }) 

    const Parsedetails = Userdetail.safeParse(req.body);
    if(!Parsedetails.success){
     res.status(400).json({
        mgs : 'Invalid inputs'
     })
    return
    }
      const {email  ,password} = Parsedetails.data;

    const Finduser = await UserModel.findOne({email})
    if(Finduser){
        res.status(409).json({
            mgs : 'user already exsists'
        })
        return
    }  
     const SecurePassword = await bcrypt.hash(password,5);

     await UserModel.create({
        email : email ,
        password : SecurePassword
     })
    
     res.status(200).json({
        mgs : 'User Created'
     })
     return
    }catch(error){
        res.status(500).json({
            mgs :'server down'
        })
    }
})
// Signin-endPoint
    
 router.post('/signin' , async (req,res)=>{
try{
         const Userdetail = z.object({
       email : z.string().max(30).min(3).email(),
       password : z.string().max(30).min(3)
    }) 
     
     const Parsedetails = Userdetail.safeParse(req.body)
       if(!Parsedetails.success){
        res.status(400).json({
            mgs:'Invalid input'
        })
        return
       }
       const {email , password} = Parsedetails.data;

       const Finduser = await UserModel.findOne({email})
          if(!Finduser){
            res.status(404).json({
                mgs :'User not found'
            })
            return;
          }  
 const check = bcrypt.compare(password , Finduser.password);
 if(!check){
   res.status(400).json({
     mgs : 'invalid password'
   })
 }

         const secretKey = process.env.JWT_SECRET || 'default' ; 
         const token = jwt.sign({userId :Finduser._id }, secretKey , {
            expiresIn : '1h'
         })
        
         res.status(200).json({
            mgs : 'you are signed in',
            token : token
         })
         return 
        }catch(error){
            res.status(500).json({
                mgs : 'server down'
            })
        }
})

        router.post('/content',middleware,async (req : AuthRequest,res)=>{
               
              const Userid = req.user?.userId;  
              const {title , link , type} = req.body;   
              await UserContent.create({
                title,
                link,
                type,
                Userid
              })
              res.json({
                mgs : "Content added"
              })
        })
        
        router.get('/contents' ,middleware, async (req : AuthRequest,res)=>{
                    
         try{ 
          const Userid = req.user?.userId;
          const Content = await UserContent.find({UserId : Userid}).populate('email')
          if(!Content){
            res.status(404).json({
              mgs :'No content found'
            })
          }
          res.status(200).json({
            Content
          })}catch(error){
            res.status(500).json({
              mgs :'server down'
            })
          }
        })

        router.get('/delete/content' , middleware , async (req : AuthRequest ,res)=>{
                
          const Userid =req.user?.userId;
          const deleted =await UserContent.findByIdAndDelete({userId : Userid})
          if (!deleted) { res.status(404).json({mgs :"Content not found"})
            return};  

           res.status(200).json({
            mgs :'content deleted'
           })        
   
        })

        router.post('/brain/share' ,middleware, async (req :AuthRequest,res)=>{
      
          const  {share} =req.body;
           if(share){
   
           const Linkexists = await UserLinks.findOne({userId : req.user?.userId})
           if(Linkexists){
            res.status(409).json({
              mgs : ' already exsists'
            })
            return
           }
            await UserLinks.create({
               hash : RandomLinks(10) ,
               userId : req.user?.userId
             })
           }else{ 
              await UserLinks.findByIdAndDelete({
              userId : req.user?.userId
                     })

           }

           res.status(200).json({
            mgs : ' updated shared link'
           })
           
        })


         router.get('/brain/:sharelink' ,middleware, async (req :AuthRequest,res)=>{
                      const hash= req.params.sharelink;                  
                  const link = await UserLinks.findOne({hash})

                  if(!link){
                    res.status(411).json({
                      mgs : 'invalid input'
                    })
                  return}
      const Content = await UserContent.findOne({
        userId : link.userId
      })
        const user = await UserModel.findOne({
         _id : link.userId
        })

        if(!user){
          res.status(411).json({
            mgs : ' user not found'
          })
          return
        }
     res.status(200).json({
         username : user?.email ,
         Content : Content
     })
       
        })


export default router

app.listen(5500);



