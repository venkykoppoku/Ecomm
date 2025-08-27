import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

const CustomPagination = ({ resPerPage, totalItemsCount }) => {
  const [, setCurrentPage] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);

    if (searchParams.has("pageIndex")) {
      searchParams.set("pageIndex", selectedPage.selected + 1);
    } else {
      searchParams.append("pageIndex", selectedPage.selected + 1);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };
  return (
    <div>
      <ReactPaginate
        pageCount={Math.ceil(totalItemsCount / resPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        previousLabel="< Prev"
        nextLabel="Next >"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default CustomPagination;
