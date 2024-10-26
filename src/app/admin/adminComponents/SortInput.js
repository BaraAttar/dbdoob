import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./styles/Sort.module.css";
import Image from "next/image";

import arrowIcon from "@/assets/arrowIcon.svg";

export default function SortInput({ type, options, onOptionSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowOptions(false);
    onOptionSelect(option);
  };

  const handleClickOutside = useCallback((event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.textFieldContainer} ref={containerRef}>
      <input
        type="text"
        className={styles.textInput}
        onChange={handleInputChange}
        onFocus={() => setShowOptions(true)}
        placeholder={type}
        value={inputValue}
      />
      <Image
        alt="arrow"
        className={styles.arrowIcon}
        src={arrowIcon}
        width={20}
        height={20}
      />
      {showOptions && (
        <ul className={styles.optionsList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.optionItem}
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
