import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-text">
                    <h1>Welcome to the Farm Marketplace</h1>
                    <p>Your one-stop shop for fresh, locally grown farm products, delivered directly from farmers to your doorstep. Experience the freshest produce, premium dairy, and handmade goods, all at your fingertips.</p>
                    <button className="cta-button">Explore Our Products</button>
                </div>
            </header>

            {/* Introduction Section */}
            <section className="intro-section">
                <h2>Why Choose Us?</h2>
                <div className="intro-cards">
                    <div className="intro-card">
                        <h3>Fresh & Local</h3>
                        <p>We bring fresh, local farm products directly to you, ensuring quality and sustainability.</p>
                    </div>
                    <div className="intro-card">
                        <h3>Support Local Farmers</h3>
                        <p>Your purchase supports local farmers, promoting ethical farming practices and economic growth in rural areas.</p>
                    </div>
                    <div className="intro-card">
                        <h3>Convenient & Reliable</h3>
                        <p>Shop from the comfort of your home and have farm-fresh products delivered to your doorstep at your convenience.</p>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <h2>Featured Products</h2>
                <p>Browse our most popular items available now. From organic fruits and vegetables to handmade artisanal products, we've got everything you need.</p>
                <ProductList />
            </section>
        </div>
    );
};

export default Home;
