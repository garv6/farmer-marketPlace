import React, { useState, useEffect } from 'react';

const CartTest = () => {
    const [cartItems, setCartItems] = useState([]);
    const [testProduct, setTestProduct] = useState({
        id: 'test-product-1',
        name: 'Test Product',
        price: 9.99,
        image: 'https://via.placeholder.com/150',
        description: 'This is a test product'
    });

    useEffect(() => {
        // Load cart from localStorage on component mount
        loadCart();
    }, []);

    const loadCart = () => {
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const parsedCart = JSON.parse(cart);
                setCartItems(parsedCart);
                console.log('Cart loaded:', parsedCart);
            } else {
                console.log('No cart found in localStorage');
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const addToCart = () => {
        try {
            // Create a new cart item
            const newItem = {
                ...testProduct,
                quantity: 1
            };
            
            // Get existing cart or initialize empty array
            let currentCart = [];
            const existingCart = localStorage.getItem('cart');
            
            if (existingCart) {
                currentCart = JSON.parse(existingCart);
            }
            
            // Add the new item
            currentCart.push(newItem);
            
            // Save back to localStorage
            localStorage.setItem('cart', JSON.stringify(currentCart));
            
            // Update state
            setCartItems(currentCart);
            
            console.log('Product added to cart:', newItem);
            console.log('Updated cart:', currentCart);
            
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart: ' + error.message);
        }
    };

    const clearCart = () => {
        try {
            localStorage.removeItem('cart');
            setCartItems([]);
            console.log('Cart cleared');
            alert('Cart cleared!');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Cart Test Page</h1>
            
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h2>Test Controls</h2>
                <button 
                    onClick={addToCart}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                >
                    Add Test Product to Cart
                </button>
                
                <button 
                    onClick={clearCart}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#f44336', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear Cart
                </button>
                
                <button 
                    onClick={loadCart}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#2196F3', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        marginLeft: '10px',
                        cursor: 'pointer'
                    }}
                >
                    Reload Cart from localStorage
                </button>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h2>Current Cart Contents</h2>
                {cartItems.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <div>
                        <p><strong>Total Items:</strong> {cartItems.length}</p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {cartItems.map((item, index) => (
                                <li key={index} style={{ 
                                    padding: '10px', 
                                    margin: '5px 0', 
                                    border: '1px solid #eee',
                                    borderRadius: '4px'
                                }}>
                                    <strong>{item.name}</strong> - ${item.price} x {item.quantity || 1}
                                    <br />
                                    <small>ID: {item.id || item._id}</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h2>localStorage Debug</h2>
                <p>Raw cart data from localStorage:</p>
                <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    maxHeight: '200px'
                }}>
                    {localStorage.getItem('cart') || 'No cart data found'}
                </pre>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h2>Navigation</h2>
                <a 
                    href="/cart" 
                    style={{ 
                        display: 'inline-block',
                        padding: '10px 20px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        marginRight: '10px'
                    }}
                >
                    Go to Cart Page
                </a>
                
                <a 
                    href="/home" 
                    style={{ 
                        display: 'inline-block',
                        padding: '10px 20px', 
                        backgroundColor: '#2196F3', 
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default CartTest;
