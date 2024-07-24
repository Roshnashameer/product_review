import React from 'react';
import ProductDetails from '../components/ProductDetails';
import Header from '../components/Header';

const ProductPage: React.FC = () => {
    return (
        <div>
            <Header></Header>
            <ProductDetails />
        </div>
    );
};

export default ProductPage;
