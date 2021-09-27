const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    u_name: {
        type: String,
        require: true
    },
    u_email: {
        type: String,
        require: true
    },
    u_mobile: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    },
    u_address: {
        type: String,
        require: true
    },
    u_orders: {
        type: Array
    },
    u_password: {
        type: String,
        require: true
    }

});

const users = mongoose.model("user", userSchema);

module.exports = users;