"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Pagination from "@/app/components/Pagination";
import SortCard from "../../../adminComponents/SortCard";

// Icon
import { useEffect, useMemo, useState } from "react";
import { useProductsStore } from "@/stores/useProducts";
import ProductsList from "@/app/admin/adminComponents/ProductsList";

export default function page() {
  const params = useParams();
  const category = params.productsCategory;
  const { products, status, error , fetchProducts } = useProductsStore();

  const [pageNumber, setPageNumber] = useState(1); // current Page

  useEffect(() => {
    fetchProducts({ category, page: pageNumber });
  }, [category, pageNumber]);

  const productsList = useMemo(
    () => products?.products || [],
    [products?.products]
  );
  const pagination = useMemo(
    () => products?.pagination || null,
    [products?.pagination]
  );

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div className={styles.productCardsContainer}>
      <SortCard />
      <div className={styles.cardBody}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Product</th>
                <th className={styles.th}>Product ID</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Product Price</th>
                <th className={styles.th}>Stock</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <ProductsList productsList={productsList} status={status} error={error} />
          </table>
        </div>
        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

// export function ProductsList({ productsList, status }) {
//   // Dropdown Button
//   const [openDropdownId, setOpenDropdownId] = useState(null); // Track the open dropdown

//   const toggleDropdown = (id) => {
//     // Toggle dropdown or close others
//     setOpenDropdownId((prevId) => (prevId === id ? null : id));
//   };
//   return (
//     <tbody className={styles.tbody}>
//       {status === "pending" && (
//         <tr>
//           <td colSpan="7">Loading...</td>
//         </tr>
//       )}
//       {productsList.length === 0 && status !== "pending" && (
//         <tr>
//           <td colSpan="7">No products available</td>
//         </tr>
//       )}
//       {productsList.map((product) => (
//         <tr className={styles.tr} key={product._id}>
//           <td className={styles.td}>{product.name}</td>
//           <td className={styles.td}>{product._id}</td>
//           <td className={styles.td}>{product.category}</td>
//           <td className={styles.td}>{product.price}</td>
//           <td className={styles.td}>{product.stock}</td>
//           <td className={styles.td}>{product.status}</td>
//           <td className={styles.td}>
//             <DropdownButton
//               productId={product._id}
//               isOpen={openDropdownId === product._id}
//               toggleDropdown={() => toggleDropdown(product._id)}
//             />
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   );
// }
