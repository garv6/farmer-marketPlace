const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

// Add a product
const addProduct = async (req, res) => {
    const { name, price, description, image } = req.body;

    if (!image) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const product = new Product({
            name,
            price,
            description,
            image, // Store base64-encoded image
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add product' });
    }
};

module.exports = { getAllProducts, addProduct };
