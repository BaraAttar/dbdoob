import styles from "./styles/DropdownButton.module.css";
import Image from "next/image";

// icon
import edit from "@/assets/edit.svg";

export default function DropdownButton({productId, toggleDropdown, isOpen }) {
    if (isOpen) {
        console.log(productId)
    }
  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownBtn}>
        <Image alt={edit} src={edit} height={25} width={25} className={`${isOpen ?styles.transparent :""}`} />
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li className={styles.dropdownItem}>Option 1</li>
          <li className={styles.dropdownItem}>Option 2</li>
          <li className={styles.dropdownItem}>Delet</li>
        </ul>
      )}
    </div>
  );
}
