import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.css";

function usePagination(itemsPerPage, data) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  return [
    currentItems,
    <ReactPaginate
      className={classes.pagination}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />,
  ];
}

export default usePagination;
