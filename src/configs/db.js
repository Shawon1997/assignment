const mongoose = require("mongoose")
module.exports = () => {
    return mongoose.connect("mongodb+srv://Shawon1997:jaya1997@cluster0.4qkrr.mongodb.net/test")
}