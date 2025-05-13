const mongoose = require('mongoose')

const DcmVmxSchema = new mongoose.Schema(
    {
        nombreDcmVmx:{
            type:String,
            required:true,
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

const DcmVmx = mongoose.model('DcmVmx', DcmVmxSchema)
module.exports = DcmVmx;