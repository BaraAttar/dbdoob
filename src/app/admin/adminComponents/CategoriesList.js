import styles from "./styles/CategoriesList.module.css";
import CategoryRow from "./CategoryRow";
import { Suspense } from "react";
import Loading from "../dashboard/categories/Loading";

export default function CategoriesList({ categoriesList }) {
  return (
    <Suspense fallback={<Loading />}>
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
            {categoriesList ? (
              categoriesList.length > 0 ? (
                categoriesList.map((category) => (
                  <CategoryRow key={category._id} category={category} />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.empty}>
                    No categories to show
                  </td>
                </tr>
              )
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
}
