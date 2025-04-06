import React from 'react';
import '../styles/Bill.css';

const Bill = ({ cart }) => {
    const total = cart.reduce((sum, product) => sum + product.price, 0);

    return (
        <div className="bill-page">
            <h2>Bill Summary</h2>
            <div className="bill-items">
                {cart.map((item) => (
                    <div key={item._id} className="bill-item">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <p>Thank you for your purchase!</p>
        </div>
    );
};

export default Bill;
