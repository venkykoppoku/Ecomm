import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const Filters = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleClick = (checkBox) => {
    const isChecked = checkBox.checked;
    const value = checkBox.value;
    let updatedCategories;
    if (isChecked) {
      updatedCategories = [...selectedCategories, value];
    } else {
      updatedCategories = selectedCategories.filter(
        (category) => category !== value
      );
    }

    setSelectedCategories(updatedCategories);

    // Build query string
    const categories = updatedCategories.join(",");
    if (searchParams.has("category") && categories) {
      searchParams.set("category", categories);
    } else {
      if (categories) {
        searchParams.append("category", categories);
      } else {
        searchParams.delete("category");
      }
    }

    const path = window.location.pathname + "?" + searchParams?.toString();
    navigate(path);
  };

  const handlePriceButtonClick = (event) => {
    event.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    const path = window.location.pathname + "?" + searchParams?.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const selectedCheckBoxes = searchParams?.get(checkboxType);
    if (selectedCheckBoxes?.includes(checkboxValue)) return true;
    return false;
  };

  //restore values after reload the page
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    searchParams.has(min) && setMin(searchParams.get("min"));
    searchParams.has(max) && setMax(searchParams.get("max"));
  }, [searchParams, min, max]);

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form id="filter_form" className="px-2" onSubmit={handlePriceButtonClick}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={category}
            defaultChecked={defaultCheckHandler("category", category)}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor="check4">
            {category}
          </label>
        </div>
      ))}
      <hr />
      <h5 className="mb-3">Ratings</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label className="form-check-label" htmlFor="check7">
          <span className="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label className="form-check-label" htmlFor="check8">
          <span className="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>
  );
};

export default Filters;
