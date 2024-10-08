import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import img1 from '../../../assets/img/product-image/product1.png';
import img10 from '../../../assets/img/product-image/product10.png';

//Her bir ürünü temsil edecek
const ProductCard = (props) => {
  let dispatch = useDispatch();

  const sepeteEkle = async (id) => {
    console.log('tıklandı');
    dispatch({ type: 'products/AddToCart', payload: { id } });
  };

  const favorilereEkle = async (id) => {
    console.log('tıklandı');
    dispatch({ type: 'products/addToFavorites', payload: { id } });
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imageUrl = `${baseUrl}${props.data.img}`;
  return (
    <>
      <div className="product_wrappers_one">
        <div className="thumb">
          <Link to={`/product-details-two/${props.data.id}`} className="image">
            <img
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = img1;
              }}
              src={imageUrl}
              alt={props.data.title}
            ></img>

            <img className="hover-image" src={img10} alt={props.data.title} />
          </Link>
          <span className="badges">
            <span className={['yaz', 'yeni', 'satışta'][Math.round(Math.random() * 2)]}>
              {props.data.labels}
            </span>
          </span>
          <div className="actions">
            <a
              href="#!"
              className="action wishlist"
              title="Favorilere Ekle"
              onClick={() => favorilereEkle(props.data.id)}
            >
              <AiOutlineHeart />
            </a>
          </div>
          <button
            type="button"
            className="add-to-cart offcanvas-toggle"
            onClick={() => sepeteEkle(props.data.id)}
          >
            Sepete Ekle
          </button>
        </div>
        <div className="content">
          <h5 className="title">
            <Link to={`/product-details-two/${props.data.id}`}>{props.data.title}</Link>
          </h5>
          <span className="price">
            <span className="new">{props.data.price} TL</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
