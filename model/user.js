const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String
    },
    
    password:{
        type: String
    },
    role: {
        type: String,
        required: false,
        enum: ["user", "admin"],
        default: "user"
    }
})

module.exports = mongoose.model('User', userSchema);