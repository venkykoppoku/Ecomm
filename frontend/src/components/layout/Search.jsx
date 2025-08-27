import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (searchKey?.trim()) {
      navigate(`/?search=${searchKey}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Enter Product Name ..."
          name="keyword"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
}

export default Search;
