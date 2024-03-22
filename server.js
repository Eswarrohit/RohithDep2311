const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const multer=require("multer");
const dotenv = require("dotenv");
const path = require("node:path");


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, 'uploads');
    },
    filename:  (req, file, cb)=>{
        console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage });

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname,"./client/build")));



let userSchema= new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String
});

let DetailsOFUser=new mongoose.model("user",userSchema);

app.post("/Signup",upload.single("profilePic"), async(request,response)=>{
    console.log(request.body);
    console.log(request.file.path);
  
  
    try{
 let UserDetails= new DetailsOFUser({
    firstName:request.body.firstName,
    lastName:request.body.lastName,
    age:Number(request.body.age),
    email:request.body.email,
    password:request.body.password,
    mobileNo:request.body.mobileNo,
    profilePic:request.file.path
 
 });
 
 await DetailsOFUser.insertMany([UserDetails]);
 response.json({status:"success",msg:"user created successfully"});
}catch(error){
    response.json({status:"failure",msg:"unable to create an account"});
}
})

app.post("/Login",upload.none(), async(request,response)=>{
    console.log(request.body);

    let Details= await DetailsOFUser.find().and({email:request.body.email});
    if(Details.length > 0){
        if(Details[0].password == request.body.password){
            let userDataToSend={
                firstName:Details[0].firstName,
                lastName:Details[0].lastName,
                age:Details[0].age,
                email:Details[0].email,
                mobileNo:Details[0].mobileNo,
                profilePic:Details[0].profilePic,

            }
            response.json({status:"success",data:userDataToSend});
        }else{
            response.json({status:"failure",msg:"Invaild password"});
        }
    }else{
        response.json({status:"failure",msg:"userDoesnot exist"});
    }

    console.log(Details);
})


app.listen(process.env.Port, ()=>{
    console.log("port number 1435");
})


let connectToMB=async()=>{
    try {
        await mongoose.connect(process.env.DataBaseURL);
    console.log("connected to sucessfully");
    } catch (error) {
        console.log("unable to connect");
    }
    }
    
connectToMB();