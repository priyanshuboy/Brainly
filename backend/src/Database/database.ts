
import mongoose from 'mongoose'


async function MongoConnect(){
    try{
           await mongoose.connect('mongodb+srv://priyanshu:DMj3sDvUc5wccRSE@cluster0.qlswmff.mongodb.net/Brainly')
           console.log('Database connected')
 
    }catch(error){
        console.log(error)
    }
}

MongoConnect();


const schema = mongoose.Schema;

const userSchema = new schema({
    email : {type :String ,required : true ,unique :true },
    password :{type : String , required  :true}
})

const type = ['image' , 'vedio', 'audio' , 'link'];

const ContentSchema =new schema({
  title : {type : String , required : true},
  link  : {type : String , required : true},
  type :  {type : String ,enum : type , required :true},
  userId : {type : mongoose.Schema.Types.ObjectId , ref :'User', required : true }

})

const ShareSchema = new schema({
    hash  : {type : String},
    userId : {type : mongoose.Schema.Types.ObjectId , ref :'User' , required :true  , unique: true} 
})

const UserModel = mongoose.model('User' , userSchema);
const UserContent = mongoose.model('Content' , ContentSchema);
 const UserLinks = mongoose.model('Links' , ShareSchema)
export {UserModel , UserContent , UserLinks}
