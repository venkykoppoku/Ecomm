import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import { useParams } from "react-router-dom";
import { Rating, Star } from "@smastrom/react-rating";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/features/cartSlice";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;

  const [activeImage, setActiveImage] = useState("");

  const [quantity, setQuantity] = useState(0);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    setQuantity(count.valueAsNumber + 1);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber < 1) {
      return;
    }
    const qty = count.valueAsNumber - 1;

    setQuantity(qty);
  };

  const handleSetCartItems = () => {
    const item = {
      id: product?._id,
      name: product?.name,
      imageUrl: product?.images[0]?.url,
      price: product?.price,
      stock:product?.stock,
      quantity,
    };
    dispatch(setCartItems(item));
  };

  useEffect(() => {
    setActiveImage(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImage}
            alt=""
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img) => (
            <div className="col-2 ms-4 mt-2" key={img.url}>
              <a role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeImage ? "border-warning" : ""
                  } `}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={() => setActiveImage(img.url)}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

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
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({product?.numOfReviews})
          </span>
        </div>
        <hr />

        <p id="product_price">{product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQty}>
            -
          </span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />
          <span className="btn btn-primary plus" onClick={increaseQty}>
            +
          </span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product?.stock < 0}
          onClick={handleSetCartItems}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "In Stock" : "Out of stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
