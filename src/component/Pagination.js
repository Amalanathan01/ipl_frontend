import React from "react";
import { Pagination } from "react-bootstrap";

const Paginations = ({
  resultsPerPage,
  totalResults,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <Pagination.Item
        onClick={() => paginate(i)}
        key={i}
        active={i === currentPage}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
      {pageNumbers}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} />
      <Pagination.Last onClick={() => paginate(totalPages)} />
    </Pagination>
  );
};

export default Paginations;
