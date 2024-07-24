import React, { useState, useEffect } from 'react';
import { Product } from '../utils/Pdt.types';
import { homePdtApi } from '../services/allApis';
import ProductCard from '../components/PdtCard';
import Header from '../components/Header';
import './Home.css'; 

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getHomeProducts = async () => {
      try {
        const response = await homePdtApi();
        if ('data' in response && response.data) {
          const transformedProducts: Product[] = response.data.map((item: any) => ({
            id: String(item._id),
            title: item.title,
            description: item.description,
            imageUrl: item.image,
            rating: item.rating.rate,
          }));
          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error fetching home products:', error);
      }
    };

    getHomeProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="m-2 p-5">
        <h3 className="text-center text-primary">Explore with your Products</h3>
        <table>
          <tbody>
            <tr>
              {products.length > 0 ? (
                products.map((product: Product, index: number) => (
                  <td key={index} className="product-card-cell">
                    <ProductCard product={product} />
                  </td>
                ))
              ) : (
                <td colSpan={3}><h2 className="text-center">No products</h2></td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
