import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/create.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        price: 0,
        rating: 0,
        image: '',
        category: '',
        id: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'rating'? parseInt(value,10) : name === 'price'? parseFloat(value) : value,
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const productsCollection = collection(db, 'products');
            await addDoc(productsCollection, {
                title: product.title,
                price: product.price,
                rating: product.rating,
                image: product.image,
                id: product.id,
                category: product.category,
            });

            setProduct({
                title: '',
                price: 0,
                rating: 0,
                image: '',
                category: '',
                id: '',
            });

            alert('Product added successfully!');
            navigate.push('/');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={product.id}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={product.rating}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Create;