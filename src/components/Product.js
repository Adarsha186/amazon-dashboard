import React from 'react'
import '../styles/product.css'
import { Link } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
const Product = ({ docId, title, image, price, rating }) => {   
    const handleDelete=async()=>{
        const confirmDelete = window.confirm('Are you sure you want to delete this product?')
        if(confirmDelete){
            try{
                const productDoc = doc(db,'products',docId);
                await deleteDoc(productDoc);
                alert("Product deleted successfully")
                window.location.reload();
            }
            catch(error){
                console.log(`Error deleting document: ${error}`)
            }
        }
    }
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>⭐</p>
                        ))}
                </div>
            </div>
            <img src={image} alt="" />

            <Link to={`/edit/${docId}`}><button>Edit</button></Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Product