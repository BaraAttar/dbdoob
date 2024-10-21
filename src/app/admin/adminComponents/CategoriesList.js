import { useRouter } from "next/navigation";
import styles from "./styles/CategoriesList.module.css";
import CategoryRow from "./CategoryRow";

export default function CategoriesList({ categoriesList, openEdit }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Products</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList?.map((category) => (
            <CategoryRow key={category._id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
