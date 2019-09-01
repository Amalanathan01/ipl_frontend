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
          <Pagination.First onClick={() => paginate(currentPage - 10 <= 0 ? 1 : currentPage-10)} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1 <= 0 ? currentPage : currentPage - 1)} />
          {pageNumbers.slice(currentPage - 1, currentPage + 19)}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} />
          <Pagination.Last onClick={() => paginate(currentPage + 10 > totalPages ? totalPages : currentPage + 10)} />
    </Pagination>
  );
};

export default Paginations;
