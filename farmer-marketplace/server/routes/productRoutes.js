// // const express = require('express');
// // const { getAllProducts, addProduct } = require('../controllers/productController');
// // const router = express.Router();

// // router.get('/', getAllProducts);
// // router.post('/', addProduct);

// // module.exports = router;


// const express = require('express');
// const { getAllProducts, addProduct } = require('../controllers/productController');
// const router = express.Router();

// // Route to get all products
// router.get('/products', getAllProducts);

// // Route to add a new product
// router.post('/products', addProduct);

// module.exports = router;

const express = require('express');
const { getAllProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

// Route to get all products
router.get('/', getAllProducts);

// Route to add a new product
router.post('/', addProduct);

module.exports = router;
