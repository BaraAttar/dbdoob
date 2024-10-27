import styles from "./styles/DropdownButton.module.css";
import Image from "next/image";

// icon
import options from "@/assets/dashboard/options.svg";

export default function DropdownButton({
  id,
  toggleDropdown,
  isOpen,
  deleteFromStore,
  deleteStatus,
  deletingId,
}) {

  function handleDeleteBtn() {
    deleteFromStore(id);
  }
  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownBtn}>
        {deleteStatus === "pending" && deletingId === id ? (
          <p className={styles.loader}></p>
        ) : (
          <Image
            alt={"options icon"}
            src={options}
            height={20}
            width={20}
            className={`${isOpen ? "" : styles.transparent}`}
          />
        )}
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li className={styles.dropdownItem}>Edit</li>
          <li onClick={handleDeleteBtn} className={styles.dropdownItem}>
            Delet
          </li>
        </ul>
      )}
    </div>
  );
}
