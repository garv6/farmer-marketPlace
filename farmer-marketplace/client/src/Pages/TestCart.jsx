import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearCart, addProductToCart, getCart, runCartTest } from '../utils/cartTester';

const TestCart = () => {
    const [testResults, setTestResults] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isTestRunning, setIsTestRunning] = useState(false);

    // Sample test products
    const testProducts = [
        {
            id: 'test-product-1',
            name: 'Organic Apples',
            price: 3.99,
            image: 'https://via.placeholder.com/150',
            description: 'Fresh organic apples from local farms'
        },
        {
            id: 'test-product-2',
            name: 'Farm Fresh Eggs',
            price: 5.49,
            image: 'https://via.placeholder.com/150',
            description: 'Free-range eggs from happy chickens'
        },
        {
            id: 'test-product-3',
            name: 'Organic Honey',
            price: 8.99,
            image: 'https://via.placeholder.com/150',
            description: 'Pure, raw honey from local beekeepers'
        }
    ];

    useEffect(() => {
        // Load cart items when component mounts
        updateCartDisplay();

        // Set up event listener for cart updates
        const handleCartUpdate = () => {
            updateCartDisplay();
            addTestResult('Cart update event detected and handled');
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const updateCartDisplay = () => {
        const currentCart = getCart();
        setCartItems(currentCart);
    };

    const addTestResult = (message, isError = false) => {
        setTestResults(prev => [
            ...prev,
            { message, isError, timestamp: new Date().toLocaleTimeString() }
        ]);
    };

    const handleAddProduct = (product) => {
        try {
            addProductToCart(product);
            addTestResult(`Added ${product.name} to cart`);
            updateCartDisplay();
        } catch (error) {
            addTestResult(`Error adding ${product.name} to cart: ${error.message}`, true);
        }
    };

    const handleClearCart = () => {
        try {
            clearCart();
            addTestResult('Cart cleared');
            updateCartDisplay();
        } catch (error) {
            addTestResult(`Error clearing cart: ${error.message}`, true);
        }
    };

    const handleRunTest = () => {
        setIsTestRunning(true);
        setTestResults([]);
        addTestResult('Starting cart functionality test...');

        try {
            // Clear the cart first
            clearCart();
            addTestResult('Cart cleared for testing');

            // Add test products one by one with delay
            testProducts.forEach((product, index) => {
                setTimeout(() => {
                    addProductToCart(product);
                    addTestResult(`Added ${product.name} to cart`);
                    updateCartDisplay();

                    // If this is the last product, finish the test
                    if (index === testProducts.length - 1) {
                        setTimeout(() => {
                            const finalCart = getCart();
                            if (finalCart.length === testProducts.length) {
                                addTestResult(`Test passed: Cart contains ${finalCart.length} items as expected`);
                            } else {
                                addTestResult(`Test failed: Cart contains ${finalCart.length} items, expected ${testProducts.length}`, true);
                            }
                            setIsTestRunning(false);
                        }, 500);
                    }
                }, index * 1000); // Add products with 1 second delay between each
            });
        } catch (error) {
            addTestResult(`Test error: ${error.message}`, true);
            setIsTestRunning(false);
        }
    };

    return (
        <div className="test-cart-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1>Cart Functionality Test</h1>

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Left column - Test controls and results */}
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <h2>Test Controls</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <button 
                            onClick={handleRunTest} 
                            disabled={isTestRunning}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isTestRunning ? 'not-allowed' : 'pointer',
                                opacity: isTestRunning ? 0.7 : 1
                            }}
                        >
                            {isTestRunning ? 'Test Running...' : 'Run Automated Test'}
                        </button>
                        <button 
                            onClick={handleClearCart}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                marginLeft: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>

                    <h3>Test Products</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                        {testProducts.map(product => (
                            <div 
                                key={product.id} 
                                style={{ 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px', 
                                    padding: '10px',
                                    width: 'calc(50% - 5px)',
                                    backgroundColor: 'white'
                                }}
                            >
                                <h4>{product.name}</h4>
                                <p>${product.price}</p>
                                <button 
                                    onClick={() => handleAddProduct(product)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#2196F3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    <h3>Test Results</h3>
                    <div 
                        style={{ 
                            backgroundColor: '#000', 
                            color: '#0f0', 
                            fontFamily: 'monospace',
                            padding: '10px',
                            borderRadius: '4px',
                            height: '300px',
                            overflowY: 'auto'
                        }}
                    >
                        {testResults.length === 0 ? (
                            <p>No test results yet. Run a test to see results.</p>
                        ) : (
                            testResults.map((result, index) => (
                                <div key={index} style={{ color: result.isError ? '#f44336' : '#0f0' }}>
                                    [{result.timestamp}] {result.message}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right column - Current cart */}
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <h2>Current Cart Contents</h2>
                    {cartItems.length === 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        <div>
                            {cartItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    style={{ 
                                        backgroundColor: 'white',
                                        padding: '15px', 
                                        marginBottom: '10px', 
                                        borderRadius: '4px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                                        <p style={{ margin: '0' }}>${item.price} x {item.quantity}</p>
                                    </div>
                                    <div>
                                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                    </div>
                                </div>
                            ))}
                            <div style={{ 
                                marginTop: '20px', 
                                padding: '15px', 
                                backgroundColor: '#e8f5e9', 
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontWeight: 'bold'
                            }}>
                                <span>Total:</span>
                                <span>
                                    ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '20px' }}>
                        <h3>Raw Cart Data</h3>
                        <pre style={{ 
                            backgroundColor: '#f0f0f0', 
                            padding: '10px', 
                            borderRadius: '4px',
                            overflow: 'auto',
                            maxHeight: '200px'
                        }}>
                            {JSON.stringify(cartItems, null, 2)}
                        </pre>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <Link 
                            to="/cart" 
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
                        </Link>
                        <Link 
                            to="/home" 
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
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCart;
