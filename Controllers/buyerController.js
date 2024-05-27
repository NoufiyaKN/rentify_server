const jwt = require('jsonwebtoken');
const buyers = require('../Models/buyerModel')

exports.register = async (req,res)=>{
    console.log("Inside register Request!!!");
    const {firstname,lastname,email,phonenumber,password} = req.body
    console.log(firstname,lastname,email,phonenumber,password);
    try{
        const existingBuyer = await buyers.findOne({email})
        if(existingBuyer){
            res.status(406).json("User Already exists!!!")
        }else{
            const newBuyer = new buyers({
                firstname,lastname,email,phonenumber,password
            })
            await newBuyer.save()
            res.status(200).json(newBuyer)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

