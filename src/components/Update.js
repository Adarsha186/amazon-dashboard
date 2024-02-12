import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Update = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: 0,
        rating: 0,
        image: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productDocRef = doc(db, 'products', id);
                const productSnapshot = await getDoc(productDocRef);

                if (productSnapshot.exists()) {
                    const productData = productSnapshot.data();
                    setProduct(productData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSave = async () => {
        try {
            const productDocRef = doc(db, 'products', id); 
            await updateDoc(productDocRef, {
                title: product.title,
                price: product.price,
                rating: product.rating,
                image: product.image,
            });
            console.log('Product updated:', product);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'rating'? parseInt(value,10) : name === 'price'? parseFloat(value) : value,
        }));
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                />

                <label htmlFor="rating">Rating</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={product.rating}
                    onChange={handleInputChange}
                />

                <label htmlFor="image">Image URL</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={product.image}
                    onChange={handleInputChange}
                />

                <button onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default Update;
