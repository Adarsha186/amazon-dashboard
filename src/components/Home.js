import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Product from './Product';
import { useStateValue } from '../StateProvider';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, 'products');
            const querySnapshot = await getDocs(productsCollection);
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                docId: doc.id
            }));
            console.log(productsData)
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="home">
            {user ? (
                <div className="home__container">
                    <h2>Products</h2>
                    <div className='home__row'>
                        {products.map((product) => {
                            return <Product 
                                key={product.id} 
                                docId={product.docId} 
                                title={product.title}
                                price={product.price}
                                rating={product.rating}
                                image={product.image}
                            />;
                        })}
                    </div>
                </div>
            ) : (
                <p>Please Sign In</p>
            )}
        </div>
    );
};

export default Home;
