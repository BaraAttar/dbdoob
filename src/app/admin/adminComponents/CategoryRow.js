import { useRouter } from "next/navigation";
import styles from "./styles/CategoryRow.module.css";
import DropdownButton from "./DropdownButton";
import { useEffect, useRef, useState } from "react";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

export default function CategoryRow({ category }) {
  const { deleteCategory, deleteStatus, deletingId } = useCategoriesStore();

  const router = useRouter();

  function openCategory(id) {
    console.log(id);
    router.push(`/admin/dashboard/products/${id}`);
  }

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
    <tr key={category._id} ref={containerRef}>
      <td onClick={() => openCategory(category.name)} className={styles.td}>
        {category.name}
      </td>
      <td className={styles.td}>{category.products}</td>
      <td className={styles.td}>
        <p
          className={
            category.status === "Active"
              ? styles.active
              : "" || category.status === "Inactive"
              ? styles.Inactive
              : ""
          }
        >
          {category.status}
        </p>
      </td>
      <td className={styles.td}>
        <DropdownButton
          id={category._id}
          isOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          deleteFromStore={deleteCategory}
          deleteStatus={deleteStatus}
          deletingId={deletingId}
        />
      </td>
    </tr>
  );
}
