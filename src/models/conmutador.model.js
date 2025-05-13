const { required } = require('joi')
const mongoose = require('mongoose')

const SwitchSchema = new mongoose.Schema({
    nameSwitch:{
        type:String,
        required:true,
    },
    interfacePort:{
        type:String,
        require:true,
    },
    vlanInterface:{
        type:String,
        require:true
    }

},{timestamps:true, versionKey:false})


const Conmutador  = mongoose.model("Conmutador", SwitchSchema);
module.exports = Conmutador ;
