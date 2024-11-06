import { useState, useRef, useEffect } from "react";
import styles from "./ProductTable.module.css";
import DropdownButton from "../../../adminComponents/DropdownButton";
import { useProductsStore } from "@/stores/useProducts";
import Image from "next/image";

export default function ProductRow({ product }) {
  const { deleteProduct, deletingId, deleteStatus } = useProductsStore();
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
    <tr className={styles.tableـrow} ref={containerRef}>
      <td className={styles.tableـcell}>
        <Image
          alt="product image"
          src={product.image}
          width={100}
          height={100}
        />
      </td>
      <td className={styles.tableـcell}>
        <p className={styles.product_name}>{product.name}</p>
        <p className={styles.description}>{product.description}</p>
      </td>
      {/* <td className={styles.td}>{product._id}</td> */}
      <td className={styles.tableـcell}>
        <div className={styles.category_cell}>
        <p className={styles.category}>{product.category}</p>
        </div>
      </td>
      <td className={styles.tableـcell}>{product.price}$</td>
      <td className={styles.tableـcell}>{product.stock}</td>
      <td className={styles.tableـcell}>{product.status}</td>
      <td className={styles.tableـcell}>
        <DropdownButton
          id={product._id}
          isOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          deleteFromStore={deleteProduct}
          deleteStatus={deleteStatus}
          deletingId={deletingId}
        />
      </td>
    </tr>
  );
}
