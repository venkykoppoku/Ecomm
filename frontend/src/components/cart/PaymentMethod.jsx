import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { calculateOrderTotal } from "../../helpers/helper";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { itemsPrice, shippingAmount, taxAmount, totalAmount } =
    calculateOrderTotal(cartItems);

  const navigate = useNavigate();

  const [createOrder, { isLoading, isSuccess, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("order created successfully");
      navigate("/");
    }
  }, [error, isSuccess, navigate]);

  const handleSubmit = (event) => {
    const transFormCartItems = cartItems?.map((item) => ({
      ...item,
      product: item.id,
      image: item.imageUrl,
    }));
    event.preventDefault();
    const orderData = {
      shippingInfo: shippingAddress,
      orderItems: transFormCartItems,
      itemsPrice,
      shippingAmount,
      taxAmount,
      totalAmount,
      paymentInfo: {
        status: "Not Paid",
      },
      paymentMethod: paymentMethod,
    };
    if (paymentMethod === "COD") {
      alert("COD");
      createOrder(orderData);
    }

    if (paymentMethod === "Card") {
      alert("Card");
    }
  };
  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={() => setPaymentMethod("COD")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={() => setPaymentMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn py-2 w-100"
              disabled={isLoading}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
