const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
    contNum:{
        type:String,
        required:true

    },
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    date:{
        type: Date,
        default: Date.now
    },
    phone:{
        type: Number,
        maxlength: 10
    },
    month:{
        type: String,
        required: true,
        
    },
    addedBy:{
        type: String,
        default: "unknown"
    },
   
})

module.exports = mongoose.model('Contractor', contractSchema)