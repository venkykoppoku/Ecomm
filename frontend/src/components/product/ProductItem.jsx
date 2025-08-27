import React from "react";
import { Link } from "react-router-dom";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductItem = ({ product, columnSize }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product?.images[0]?.url}
          alt={product?.name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product?._id}`}>{product?.name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <Rating
              value={product?.ratings}
              readOnly
              style={{ maxWidth: 120 }} // star size
              itemStyles={{
                itemShapes: Star,
                activeFillColor: "#f5c518",
                inactiveFillColor: "#ddd",
              }}
              // ⭐ Spacing goes here
              itemSpacing={4}
            />
            <span id="no_of_reviews" className="pt-2 ps-2">
              ({product?.numOfReviews})
            </span>
          </div>
          <p className="card-text mt-2">{product?.price}</p>
          <Link
            to={`/product/${product?._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
