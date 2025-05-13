const mongoose = require('mongoose')

const SignalSchema = new mongoose.Schema(
    {
        nameChannel:{
            type:String,
            required:true,
        },
        numberChannelSur:{
            type:String,
            required:true,
        },
        numberChannelCn:{
            type:String,
            required:true,
        },
        logoChannel:{
            type:String,
            required:true,
        },
        severidadChannel:{
             type:String,
            required:true,
        },
        tipoTecnologia:{
             type:String,
            required:true,
        },
        satelite:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Satellite",
            required:true,
        },
        contact:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Contact',
        }],
        equipos:[
            {
                decoderIrd:{
                     type:mongoose.Schema.Types.ObjectId,
                     ref:'Ird'

                },
                conmutador:{
                    type:mongoose.Schema.Types.ObjectId,
                     ref:'Conmutador'
                },
                encoderTitan:{
                    type:mongoose.Schema.Types.ObjectId,
                     ref:'Titan'
                },
                 dcm: {
                     type:mongoose.Schema.Types.ObjectId,
                     ref:'Dcm'
                 },
                 dcmVmx: {
                    type:mongoose.Schema.Types.ObjectId,
                     ref:'DcmVmx'
                 },
                 rtesVmx:{
                    type:mongoose.Schema.Types.ObjectId,
                     ref:'RtesVmx'
                 },
                 routerAsr:{
                    type:mongoose.Schema.Types.ObjectId,
                     ref:'RouterAsr'
                 }

            }
        ]
    }, {timestamps:true, versionKey:false}
)

const Signal = mongoose.model('Signal', SignalSchema)
module.exports = Signal;