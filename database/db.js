const mongoose = require("mongoose");

const url = 'mongodb://localhost:27017/authApi';

mongoose.connect(url).then((response) => {
    console.log("connected to db");
}).catch(e => {
    console.log(e)
})