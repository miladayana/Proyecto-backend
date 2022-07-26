const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema({
    sabores: {
        type: String,
        required:true,
        unique:true,
    },
    envases: {
        type: String,
        required: true,
    },
    toppin: {
        type: String,
    },
    precio: {
        type:Number,
        required:true,
    },
    
});
const helados = mongoose.model('helados', storeSchema);

module.exports = {helados}