import React, { useState } from 'react'
import styles from "./styles/products.module.css"

export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 40;
  const maxVisiblePages = 7;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    const firstTwoPages = [1, 2];
    const lastTwoPages = [totalPages - 1, totalPages];

    // Ensure first and last pages are included
    if (pages[0] > 3) {
      pages.unshift("...");
      pages.unshift(...firstTwoPages);
    }
    if (pages[pages.length - 1] < totalPages - 2) {
      pages.push("...");
      pages.push(...lastTwoPages);
    }

    return pages;
  };
  return (
    <main className={styles.content}>
        <form className={styles.searchForm}>
          <input className={styles.searchInput} placeholder="البحث..." />
        </form>
        <div className={styles.cards}>
          {/* Example Cards */}
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={styles.card}>{`Card ${i + 1}`}</div>
          ))}
        </div>

        {/* Pagination Bar */}
        <div className={styles.pagination}>
          {/* Previous Button */}
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &#8594; السابق
          </button>

          {/* Page Buttons */}
          {getPaginationRange().map((page, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            التالي &#8592;
          </button>
        </div>
      </main>
  )
}
