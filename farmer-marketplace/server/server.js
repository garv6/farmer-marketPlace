const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// CORS Middleware - Allow all origins during development
app.use(cors());

// Body Parsing Middleware with Increased Payload Size Limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// API welcome route
app.get('/api', (req, res) => {
    res.send('Welcome to the Farmer Marketplace API!');
});

// Serve static files from the React app
const buildPath = path.resolve('C:\\Users\\garvc\\Documents\\farmer-marketplace (2)\\farmer-marketplace\\client\\build');
console.log('Build path:', buildPath);
console.log('Build path exists:', fs.existsSync(buildPath));
console.log('Index.html exists:', fs.existsSync(path.join(buildPath, 'index.html')));

// Serve static files
app.use(express.static(buildPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// MongoDB Atlas Connection and Server Initialization
const PORT = 5000;
const mongoUri = 'mongodb+srv://test:Garv%40123@cluster0.rw24r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
