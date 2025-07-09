const mongoose = require('mongoose')

const SchemaEquipos = new mongoose.Schema({
    nombre:{
        type:String,
        required:'true'
    },
    ip_gestion:{
        type:String,
    }
})