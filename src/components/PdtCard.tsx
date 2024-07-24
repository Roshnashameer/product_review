import React from 'react';
import { Product } from '../utils/Pdt.types';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';


interface ProductCardProps {
    product: Product;
}



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className='card' style={{ width: '18rem' }}>
            
           <img src={product.imageUrl}  alt={product.title}/>
            <div className='card-body'>
                <h3 className='"card-header"'>{product.title}</h3>

                <div><h6>{product.description.length > 200 ? product.description.slice(0, 150) + ".." : product.description}</h6></div>
                <div>

                    <StarRating rating={product.rating} />

                </div>

                <Link to={`/products/${product.id}`} className="btn btn-primary">View Product</Link>
            </div>
        </div>
    );
};

export default ProductCard;
