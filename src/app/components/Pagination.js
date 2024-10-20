import React, { useEffect, useState } from "react";
import arrowIcon from "@/assets/arrowIcon.svg";

import "./style/Pagination.style.css";
import Image from "next/image";

import { useProductsStore } from "@/stores/useProducts";


export default function Pagination({pagination , onPageChange}) {
  const { products, fetchProducts } = useProductsStore();

  // console.log("Pagination render")
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const totalPages = pagination.totalPages;
  const maxVisiblePages = 5;


  // useEffect(()=>{
  //   console.log("currentPage:" ,currentPage)
  //   console.log("limit:" ,pagination.limit)
  //   console.log("totalPages:" ,pagination.totalPages)
  //   console.log("totalProducts:" ,pagination.totalProducts)
  //   console.log("*".repeat(15))
  // },[currentPage])

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
    setCurrentPage(pageNumber)
    // Logic to fetch or display data for the selected page can go here
  };

  const getPaginationRange = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, end + (maxVisiblePages - (end - start + 1)));
      } else if (end === totalPages) {
        start = Math.max(1, start - (maxVisiblePages - (end - start + 1)));
      }

    }

    // Add the first two pages and last two pages if necessary
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const firstPage = [1];
    const lastPage = [totalPages];

    // Ensure first and last pages are included
    if (pages[0] > 3) {
      pages.unshift("...");
      pages.unshift(...firstPage);
    }
    if (pages[pages.length - 1] < totalPages - 2) {
      pages.push("...");
      pages.push(...lastPage);
    }

    return pages;
  };

  return (
    <div>
      {/* Pagination Bar */}
      <div className="pagination">
        {/* Previous Button */}
        <button
          className="pageButton"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <Image src={arrowIcon} alt="previous" />
        </button>
        {/* Page Buttons */}
        {getPaginationRange().map((page, index) => (
          <button
            key={index}
            className={`${"pageButton"} ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
          >
            <p>{page}</p>
          </button>
        ))}

        {/* Next Button */}
        <button
          className="pageButton"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image src={arrowIcon} className="arrowIconLeft"  alt="next"  />
        </button>
      </div>
    </div>
  );
}
