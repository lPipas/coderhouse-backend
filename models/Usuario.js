const mongoose = require('mongoose');
const { Schema } = mongoose;

const Usuario = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', Usuario);