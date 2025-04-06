import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');  // Check if token exists in localStorage
    const user = JSON.parse(localStorage.getItem('user'));  // Retrieve user data
    const [cartCount, setCartCount] = useState(0);

    // Simple function to update cart count
    useEffect(() => {
        function updateCartCount() {
            const cart = localStorage.getItem('cart');
            if (cart) {
                try {
                    const cartItems = JSON.parse(cart);
                    setCartCount(cartItems.length);
                } catch (e) {
                    console.error('Error parsing cart:', e);
                    setCartCount(0);
                }
            } else {
                setCartCount(0);
            }
        }
        
        // Initial count
        updateCartCount();
        
        // Check every second for changes
        const interval = setInterval(updateCartCount, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        localStorage.removeItem('user');  // Remove user data from localStorage
        navigate('/login');  // Redirect to login page after logout
    };

    return (
        <nav>
            <div className="logo">
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    <h2>AgriMarket</h2>
                </Link>
            </div>

            <div className="right">
                {token ? (
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        {user?.isFarmer && (
                            <li><Link to="/farmer-dashboard">Dashboard</Link></li>
                        )}
                        <li>
                            <Link to="/cart" className="cart-link">
                                Cart 
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </Link>
                        </li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                ) : (
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li>
                            <Link to="/cart" className="cart-link">
                                Cart 
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
