const mongoose = require('mongoose');

let today = new Date().toISOString().slice(0, 10);

const contactSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        default: today,
    },
    user_image: {
        type: String,
        default: '../resources/programmer.png',
    },
    status: {
        type: Boolean,
        default: true,
    }
})


module.exports = mongoose.model('Contact', contactSchema);