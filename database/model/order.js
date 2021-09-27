const mongoose = require("mongoose")
const orderScehma = mongoose.Schema({

    order_userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    order_items: {
        type: Array,
        require: true
    },
    order_exDelDate: {
        type: Date,
        require: true
    },
    order_actDelDate: {
        type: Date,
        require: true
    },
    order_address: {
        type: String,
        require: true
    },
    order_status: {
        type: String,
        require: true
    },
    order_price: {
        type: Number,
        require: true
    },
    order_comment: {
        type: String,
        require: true
    },
    name:{
        type:String,
        reqired:true
    },email:{
        type:String,
        requried:true
    },mobile:{
        type:String,
        required:true
    },
  
    landmark:{
        type:String,
        required:true
    },
    credit:{
        type:Number,
        required:true
    },
    
})

const order = mongoose.model("order", orderScehma);

module.exports = order;