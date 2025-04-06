import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CartButton.css';

const CartButton = () => {
    const [cartCount, setCartCount] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(Date.now()); // Track last update time
    const navigate = useNavigate();

    // Function to update cart count with detailed logging
    const updateCartCount = () => {
        console.log('CartButton: Updating cart count...');
        try {
            const cartData = localStorage.getItem('cart');
            console.log('CartButton: Raw cart data from localStorage:', cartData);
            
            if (!cartData) {
                console.log('CartButton: No cart data found, setting count to 0');
                setCartCount(0);
                return;
            }
            
            const cart = JSON.parse(cartData);
            console.log('CartButton: Parsed cart data:', cart);
            
            if (!Array.isArray(cart)) {
                console.log('CartButton: Cart is not an array, setting count to 0');
                setCartCount(0);
                return;
            }
            
            // Calculate total items (accounting for quantity)
            const count = cart.reduce((total, item) => {
                const quantity = item.quantity || 1;
                console.log(`CartButton: Item ${item.name} has quantity ${quantity}`);
                return total + quantity;
            }, 0);
            
            console.log(`CartButton: Total cart count: ${count}`);
            setCartCount(count);
            setLastUpdate(Date.now()); // Update the last change timestamp
        } catch (error) {
            console.error('CartButton: Error calculating cart count:', error);
            setCartCount(0);
        }
    };

    // Use effect to set up the cart count and event listeners
    useEffect(() => {
        console.log('CartButton: Component mounted, setting up listeners');
        
        // Initial count on mount
        updateCartCount();
        
        // Set up event listener for the cartUpdated event
        const handleCartUpdated = () => {
            console.log('CartButton: cartUpdated event received');
            updateCartCount();
        };
        
        // Set up event listener for storage events (from other tabs)
        const handleStorageChange = (event) => {
            if (event.key === 'cart') {
                console.log('CartButton: Storage event detected for cart');
                updateCartCount();
            }
        };
        
        // Attach event listeners
        window.addEventListener('cartUpdated', handleCartUpdated);
        window.addEventListener('storage', handleStorageChange);
        
        // Setup interval to periodically check cart (backup if events fail)
        const interval = setInterval(() => {
            updateCartCount();
        }, 2000);
        
        // Clean up
        return () => {
            console.log('CartButton: Removing event listeners');
            window.removeEventListener('cartUpdated', handleCartUpdated);
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // Navigation to cart page
    const goToCart = () => {
        console.log('CartButton: Navigating to cart page');
        navigate('/cart');
    };

    return (
        <button 
            className="cart-button"
            onClick={goToCart}
            aria-label={`Go to cart. ${cartCount > 0 ? `You have ${cartCount} items in your cart` : 'Your cart is empty'}`}
            tabIndex={0} // Ensure it's in the tab order
            role="button"
        >
            <span aria-hidden="true">🛒</span> Go to Cart
            {cartCount > 0 && <span className="cart-count" aria-hidden="true">{cartCount}</span>}
        </button>
    );
};

export default CartButton;
