import React from "react";
import { useSelector } from "react-redux";
import { calculateOrderTotal } from "../../helpers/helper";
import CheckoutSteps from "./CheckoutSteps";
import { Link } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, shippingAmount, taxAmount, totalAmount } =
    calculateOrderTotal(cartItems);
  return (
    <>
      <CheckoutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingAddress?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingAddress?.address}, {shippingAddress?.city},{" "}
            {shippingAddress?.zipCode}, {shippingAddress?.country}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems.map((cartItem) => (
            <React.Fragment key={cartItem?.id}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={cartItem?.imageUrl}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <a href="#">{cartItem?.name}</a>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {cartItem?.quantity} x ${cartItem?.price} ={" "}
                      <b>
                        ${(cartItem?.quantity * cartItem?.price).toFixed(2)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingAmount}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxAmount}</span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values">${totalAmount}</span>
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
