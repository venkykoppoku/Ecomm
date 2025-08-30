import React, { useState } from "react";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { saveShippingAddress } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({});

  const countriesList = Object.values(countries);

  const handleOnChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress(shippingAddress));
    navigate("/confirm_order");
  };
  return (
    <>
      <CheckoutSteps shipping />
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Shipping Info</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={shippingAddress.address}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={shippingAddress.city}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={shippingAddress.phoneNo}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">
                Postal Code
              </label>
              <input
                type="number"
                id="zip_code_field"
                className="form-control"
                name="zipCode"
                value={shippingAddress.zipCode}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Country
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={shippingAddress.country}
                onChange={handleOnChange}
                required
              >
                {countriesList.map((country) => (
                  <option key={country?.name} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
