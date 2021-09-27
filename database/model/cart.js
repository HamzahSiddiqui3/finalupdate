const mongoose = require("mongoose")
const cartScehma = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    qty: {
        type: Number,
        default: 1  
    },
    createdAt: {
        type: Date
    }
})

const cart = mongoose.model("cart", cartScehma);

module.exports = cart;