const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    imageURL:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    bedrooms:{
        type:String,
        required:true
    },
    bathrooms:{
        type:String,
        required:true
    }
})

const properties = mongoose.model("properties",propertySchema)

module.exports = properties