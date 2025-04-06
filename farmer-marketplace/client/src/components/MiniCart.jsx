import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MiniCart.css';

const MiniCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Load cart items from localStorage
        const loadCartItems = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(cart);
                const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
                setCartCount(count);
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartItems([]);
                setCartCount(0);
            }
        };

        loadCartItems();

        // Add event listener for cart updates
        const handleCartUpdate = () => {
            loadCartItems();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
        };
    }, []);

    const toggleCart = () => {
        setIsVisible(!isVisible);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0).toFixed(2);
    };

    return (
        <div className="mini-cart-container">
            <button className="cart-icon" onClick={toggleCart}>
                🛒 <span className="cart-count">{cartCount}</span>
            </button>
            
            {isVisible && cartItems.length > 0 && (
                <div className="mini-cart-dropdown">
                    <h3>Your Cart ({cartCount} items)</h3>
                    <div className="mini-cart-items">
                        {cartItems.slice(0, 3).map((item) => (
                            <div key={item.id || item._id} className="mini-cart-item">
                                <div className="item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-quantity">x{item.quantity || 1}</span>
                                </div>
                                <span className="item-price">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                            </div>
                        ))}
                        {cartItems.length > 3 && (
                            <div className="more-items">
                                +{cartItems.length - 3} more items
                            </div>
                        )}
                    </div>
                    <div className="mini-cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <Link to="/cart" className="view-cart-btn">View Cart</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiniCart;
