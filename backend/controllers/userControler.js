import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message || "An error occurred" });
    }
};




//for user register

const registerUser = async(req,res)=>{

   try {
     const {name,email,password}=req.body;
    const exist = await userModel.findOne({email})
    if(exist){
        return res.json({sucess:false,message:"User already exist"})

    }
    if(!validator.isEmail(email)){
        return res.json({sucess:false,message:"please enter a valid email"})
   
    }
    if(password.length < 8 ){
        return res.json({sucess:false,message:"please enter a strong password"})
   
    }
    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    })
    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({sucess:true,token})

   } catch (error) {
    console.log(error);
    res.status(500).json({message:error})
    
   }
}


//admin login

const adminLogin = async(req,res)=>{

    try {
        const {email,password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
}

export {loginUser,registerUser,adminLogin}