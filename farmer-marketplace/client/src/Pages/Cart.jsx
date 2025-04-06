import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Load cart items on component mount
    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        setLoading(true);
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const parsedCart = JSON.parse(cart);
                setCartItems(parsedCart);
                calculateTotal(parsedCart);
            } else {
                setCartItems([]);
                setTotal(0);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            setError('Failed to load cart items. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
        setTotal(sum);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item => 
            (item.id === productId || item._id === productId) 
                ? { ...item, quantity: newQuantity } 
                : item
        );

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => 
            item.id !== productId && item._id !== productId
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
        setTotal(0);
    };

    const handleCheckout = () => {
        // Show order placed message
        setOrderPlaced(true);
        // Clear the cart after order is placed
        clearCart();
    };

    if (loading) return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <p>Loading cart...</p>
        </div>
    );

    if (error) return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <p className="error">{error}</p>
            <Link to="/home" className="continue-shopping">Return to Home</Link>
        </div>
    );

    if (orderPlaced) return (
        <div className="cart-container">
            <div className="order-success">
                <h1>Order Placed!</h1>
                <p>Thank you for your order. Your items will be delivered soon.</p>
                <Link to="/home" className="continue-shopping">Continue Shopping</Link>
            </div>
        </div>
    );

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/home" className="continue-shopping">Continue Shopping</Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="item-image">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} />
                                    ) : (
                                        <div className="placeholder-image">No Image</div>
                                    )}
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                                <div className="item-quantity">
                                    <button 
                                        onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) - 1)}
                                        disabled={(item.quantity || 1) <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity || 1}</span>
                                    <button onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) + 1)}>
                                        +
                                    </button>
                                </div>
                                <div className="item-total">
                                    ${((item.price) * (item.quantity || 1)).toFixed(2)}
                                </div>
                                <button 
                                    className="remove-item" 
                                    onClick={() => removeItem(item.id || item._id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="cart-actions">
                            <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                            <button className="checkout" onClick={handleCheckout}>Proceed to Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
