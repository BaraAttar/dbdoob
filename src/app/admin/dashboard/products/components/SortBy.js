import React, { useState, useEffect } from "react";
import styles from "./SortBy.module.css";

// icon
import arrow from "@/assets/dashboard/arrow.svg";
import Image from "next/image";

const options = ["name", "price"];

export default function SortBy({ setSort }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);

  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");

  const toggleOptionsVisibility = () => {
    if (isOptionsVisible) {
      setIsDropdownClosing(true);
      setTimeout(() => {
        setIsOptionsVisible(false);
        setIsDropdownClosing(false);
      }, 500);
    } else {
      setIsOptionsVisible(true);
    }
  };

  const toggleSortDirection = () => {
    setSortDirection((prevOrder) =>
      prevOrder === "descending" ? "ascending" : "descending"
    );
  };

  const handleOptionClick = (option) => {
    setSelectedSortOption(option);
    toggleOptionsVisibility();
  };

  useEffect(() => {
    const sorting = {
      name: {
        ascending: "A-Z",
        descending: "Z-A",
      },
      price: {
        ascending: "price-asc",
        descending: "price-desc",
      },
    };

    const sort = sorting[selectedSortOption]?.[sortDirection];
    if (sort) {
      setSort(sort);
    }
  }, [sortDirection, selectedSortOption]);

  return (
    <div className={styles.sort_card}>
      <p onClick={toggleOptionsVisibility} className={styles.left}>
        {selectedSortOption ? selectedSortOption : "Sort by"}
      </p>
      <div onClick={toggleSortDirection} className={styles.sort_arrow}>
        <Image
          src={arrow}
          width={25}
          height={25}
          alt="arrow"
          className={`${sortDirection === "descending" ? styles.rotate : ""}`}
        />
      </div>
      {isOptionsVisible && (
        <ul
          className={`${styles.options} ${
            isDropdownClosing ? styles.close : ""
          }`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
