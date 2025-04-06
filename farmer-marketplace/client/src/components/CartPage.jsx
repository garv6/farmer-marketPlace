import React, { useState, useEffect } from 'react';
import '../styles/CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Retrieve cart from localStorage when component mounts
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    // Update quantity in cart
    const updateQuantity = (id, quantity) => {
        let updatedCart = [...cartItems];
        const productIndex = updatedCart.findIndex(item => item._id === id);
        if (productIndex > -1) {
            updatedCart[productIndex].quantity = quantity;
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Remove product from cart
    const removeFromCart = (id) => {
        let updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Calculate total price of all items
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p>{item.name}</p>
                                <p>Price: ${item.price}</p>
                                <div>
                                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    <span> Quantity: {item.quantity} </span>
                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                </div>
                                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item._id)} className="remove-button">Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button className="checkout-button">Proceed to Checkout</button>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default CartPage;
