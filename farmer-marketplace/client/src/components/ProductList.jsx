import React, { useEffect, useState } from 'react';
import '../styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Improved cart function with better error handling and debugging
    const addToCart = (product) => {
        console.log('Adding product to cart:', product);
        
        if (!product || !product.name) {
            console.error('Invalid product:', product);
            alert('Error: Cannot add invalid product to cart');
            return;
        }
        
        // Create a standardized cart item
        const cartItem = {
            id: product.id || product._id,
            name: product.name,
            price: product.price || 0,
            image: product.image || '',
            quantity: 1
        };
        
        // Get current cart with robust error handling
        let cart = [];
        try {
            const cartString = localStorage.getItem('cart');
            console.log('Current cart from localStorage:', cartString);
            
            if (cartString) {
                try {
                    cart = JSON.parse(cartString);
                    console.log('Parsed cart:', cart);
                    
                    // Validate cart is an array
                    if (!Array.isArray(cart)) {
                        console.error('Cart is not an array, resetting cart');
                        cart = [];
                    }
                } catch (parseError) {
                    console.error('Failed to parse cart JSON:', parseError);
                    cart = [];
                }
            } else {
                console.log('No cart found in localStorage, creating new cart');
            }
        } catch (storageError) {
            console.error('Error accessing localStorage:', storageError);
            cart = [];
        }
        
        // Find existing item using a more reliable ID match
        const existingItemIndex = cart.findIndex(item => {
            const productId = product.id || product._id;
            const itemId = item.id || item._id;
            return itemId === productId;
        });
        
        console.log('Existing item index:', existingItemIndex);
        
        if (existingItemIndex >= 0) {
            // Update quantity if product already exists
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
            console.log(`Updated quantity for ${product.name} in cart to ${cart[existingItemIndex].quantity}`);
        } else {
            // Add new item to cart
            cart.push(cartItem);
            console.log(`Added new item ${product.name} to cart`);
        }
        
        // Save updated cart to localStorage
        try {
            const cartJSON = JSON.stringify(cart);
            localStorage.setItem('cart', cartJSON);
            console.log('Cart saved to localStorage:', cartJSON);
        } catch (saveError) {
            console.error('Failed to save cart to localStorage:', saveError);
            alert('Error saving to cart. Please try again.');
            return;
        }
        
        // Dispatch cart updated event
        try {
            console.log('Dispatching cartUpdated event');
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (eventError) {
            console.error('Failed to dispatch cartUpdated event:', eventError);
        }
        
        // Alert user
        alert(`${product.name} added to cart`);
    };
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product._id} className="product-card">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
