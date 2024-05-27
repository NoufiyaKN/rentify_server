const jwt = require('jsonwebtoken');
const properties = require('../Models/propertyModel')

exports.upload = async (req,res)=>{
    console.log("Inside Property upload Request!!!");
    console.log(req.payload);
    console.log(req.body);
    const {imageURL,place,area ,bedrooms,bathrooms} = req.body
    console.log(imageURL,place,area,bedrooms,bathrooms);
    try{
        const existingProperty = await properties.findOne({imageURL})
        if(existingProperty){
            res.status(406).json("Property available in our system, Kindly upload another!!!")
        }else{
            const newProperty = new properties({
                imageURL,place,area,bedrooms,bathrooms //Creating object for model
            })
            await newProperty.save()
            res.status(200).json(newProperty)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getAllProperties = async (req,res)=>{
    try{
        const allProperties = await properties.find()
        res.status(200).json(allProperties)
    }catch(err){
        res.status(401).json(err)
    }
}

