"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Pagination from "@/app/components/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductsList from "@/app/admin/dashboard/products/components/ProductsList";

// Toaster
import { Toaster, toast } from "sonner";

// stores
import { useProductsStore } from "@/stores/useProducts";
import AddProduct from "../components/AddProduct";
import SortCard from "../components/SortCard";
import SortBy from "../components/SortBy";

export default function page() {
  const params = useParams();
  const {
    products,
    addStatus,
    fetchStatus,
    error,
    fetchProducts,
    response,
    cleaner,
  } = useProductsStore();
  
  const category = params.productsCategory;
  const [pageNumber, setPageNumber] = useState(1);
  const [sort , setSort] = useState(null)

  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
    console.log(`Render count: ${renderCount.current}`);
  }, []);

  useEffect(() => {
    if (
      !products ||
      products.category !== category ||
      products.page !== pageNumber
    ) {
      fetchProducts({ category, page: pageNumber , sort });
    }
  }, [category, pageNumber , sort]);

  const productsList = useMemo(
    () => products?.products || [],
    [products?.products]
  );

  const pagination = useMemo(
    () => products?.pagination || null,
    [products?.pagination]
  );

  // const handlePageChange = (newPage) => setPageNumber(newPage);
  const handlePageChange = (newPage) => {
    if (newPage !== pageNumber) setPageNumber(newPage);
  };

  // Toaster
  useEffect(() => {
    if (error) {
      toast.error(error);
      cleaner();
    }
    if (response) {
      toast.success(response);
      fetchProducts({ category, page: pageNumber , sort });
      cleaner();
    }
  }, [error, response]);

  return (
    <div className={styles.productCardsContainer}>
      <h1>Products</h1>
      <Toaster position="top-center" />
      <div className={styles.header}>
      {/* <SortCard /> */}
      <AddProduct addStatus={addStatus} category={category} />
      <SortBy category={category} page={pageNumber} setSort={setSort}/>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Product</th>
                <th className={styles.th}></th>
                {/* <th className={styles.th}>Product ID</th> */}
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Product Price</th>
                <th className={styles.th}>Stock</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <ProductsList productsList={productsList} status={fetchStatus} />
          </table>
        </div>
        {pagination && (
          <Pagination
            pagination={pagination}
            pageNumber={pageNumber}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
