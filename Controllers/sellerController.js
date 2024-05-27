const jwt = require('jsonwebtoken');
const sellers = require('../Models/sellerModel')

exports.register = async (req,res)=>{
    console.log("Inside register Request!!!");
    const {firstname,lastname,email,phonenumber,password} = req.body
    console.log(firstname,lastname,email,phonenumber,password);
    try{
        const existingSeller = await sellers.findOne({email})
        if(existingSeller){
            res.status(406).json("User Already exists!!!")
        }else{
            const newSeller = new sellers({
                firstname,lastname,email,phonenumber,password
            })
            await newSeller.save()
            res.status(200).json(newSeller)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.login = async (req, res, isInternalCall = false) => {
    console.log("Inside seller login");
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const existingUser = await sellers.findOne({ email, password });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id, role: 'seller' }, process.env.JWT_SECRET);
            const response = {
                user: existingUser,
                token,
                role: 'seller'
            };
            if (isInternalCall) return response;
            return res.status(200).json(response);
        } else {
            if (isInternalCall) return null;
            return res.status(404).json("Invalid email / password");
        }
    } catch (err) {
        console.error(err);
        if (isInternalCall) return null;
        return res.status(401).json(err);
    }
};
