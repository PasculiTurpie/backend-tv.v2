const mongoose = require('mongoose')

const TitanSchema = new mongoose.Schema(
    {
        nombreTitan:{
            type:String,
            required:true,
        },
        urlTitan:{
            type:String,
            default:"https://i.ibb.co/zHmRSv8C/ateme-titan.png"
        },
        mcastIn:{
            type:String,
            required:true,
        },
        mcastOut:{
            type:String,
            required:true,
        },
        ipGestion:{
            type:String,
            required:true
        }
    }, {timestamps:true, versionKey:false}
)

const Titan = mongoose.model('Titan', TitanSchema)
module.exports = Titan;