const mongoose = require("mongoose")
const categoryScehma = mongoose.Schema({
    cat_name: {
        type: String,
        require: true
    }
})

const category = mongoose.model("category", categoryScehma);

module.exports = category;