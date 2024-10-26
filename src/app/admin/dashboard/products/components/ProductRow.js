import { useState, useRef, useEffect } from "react";
import styles from "./ProductRow.module.css";
import DropdownButton from "../../../adminComponents/DropdownButton";

export default function ProductRow({ product }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <tr className={styles.tr} ref={containerRef}>
      <td className={styles.td}>{product.name}</td>
      <td className={styles.td}>{product._id}</td>
      <td className={styles.td}>{product.category}</td>
      <td className={styles.td}>{product.price}</td>
      <td className={styles.td}>{product.stock}</td>
      <td className={styles.td}>{product.status}</td>
      <td className={styles.td}>
        <DropdownButton
          id={product._id}
          isOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
      </td>
    </tr>
  );
}
