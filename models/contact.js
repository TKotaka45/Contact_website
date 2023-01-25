const mongoose = require('mongoose')
const autoIncrementFactory = require('mongoose-sequence')(mongoose);

const contactSchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:false
    },
    
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:false
    },
    phone: {
        type:String,
        required: true
    },
    user_id:{
        type:Number,
        required:true
    }
})

contactSchema.plugin(autoIncrementFactory)

module.exports = mongoose.model('Contact', contactSchema)