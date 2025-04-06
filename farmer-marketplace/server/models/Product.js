const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true }, // Store image as base64 string
});

module.exports = mongoose.model('Product', productSchema);
