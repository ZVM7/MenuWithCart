import React, { forwardRef } from 'react';

export const Cart = forwardRef((props,ref) => {
    return (
        <div ref={ref} className="cart">
            <h1 style={{ color: 'chocolate', textAlign: 'left', marginLeft: '25px' }}>
                Your Cart (0)
            </h1>
            <img src="src/assets/images/illustration-empty-cart.svg" alt="Empty cart" />
            <p>Your added items will appear here</p>
        </div>
    );
});
