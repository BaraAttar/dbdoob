"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Pagination from "@/app/components/Pagination";
import SortCard from "../../../adminComponents/SortCard";
import Image from "next/image";

// Icon
import editIcon from "@/assets/edit.svg";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/stores/useProducts";

export default function page() {
  const params = useParams();
  const category = params.productsCategory;
  // console.log(productsCategory);

  const [productsList, setProducts] = useState();

  const { products, fetchProducts } = useProductsStore();

  useEffect(() => {
    if (products == null) {
      fetchProducts(category);
    } else {
      setProducts(products)
    }
  }, [products]);

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
            <tbody className={styles.tbody}>
              {productsList?.map((product) => (
                <tr className={styles.tr} key={product._id}>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>{product._id}</td>
                  <td className={styles.td}>{product.category}</td>
                  <td className={styles.td}>{product.price}</td>
                  <td className={styles.td}>{product.stock}</td>
                  {/* <td className={styles.td}>{product.type}</td> */}
                  <td className={styles.td}>{product.status}</td>
                  <td className={styles.td}>
                    <Image src={editIcon} width={20} height={20} alt="edit" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

// const productslist = [

//     {
//       "name": "Wireless Earbuds",
//       "id": "P001",
//       "price": "49.99",
//       "stock": 150,
//       "type": "Electronics",
//       "status": "In Stock"
//     },
//     {
//       "name": "Laptop Stand",
//       "id": "P002",
//       "price": "29.99",
//       "stock": 75,
//       "type": "Office Supplies",
//       "status": "In Stock"
//     },
//     {
//       "name": "Smartphone Case",
//       "id": "P003",
//       "price": "19.99",
//       "stock": 0,
//       "type": "Accessofffffjfbjrfbjrbfjrbfjbrjfrjfrjfbrjfbrries",
//       "status": "Out of Stock"
//     },
//     {
//       "name": "Bluetooth Speaker",
//       "id": "P004",
//       "price": "89.99",
//       "stock": 120,
//       "type": "Electronics",
//       "status": "In Stock"
//     },
//     {
//       "name": "Desk Organizer",
//       "id": "P005",
//       "price": "15.99",
//       "stock": 200,
//       "type": "Office Supplies",
//       "status": "In Stock"
//     },
//     {
//       "name": "USB-C Hub",
//       "id": "P006",
//       "price": "39.99",
//       "stock": 0,
//       "type": "Electronics",
//       "status": "Out of Stock"
//     },
//     {
//       "name": "Gaming Mouse",
//       "id": "P007",
//       "price": "59.99",
//       "stock": 180,
//       "type": "Accessories",
//       "status": "In Stock"
//     },
//     {
//       "name": "LED Desk Lamp",
//       "id": "P008",
//       "price": "24.99",
//       "stock": 85,
//       "type": "Lighting",
//       "status": "In Stock"
//     },
//     {
//       "name": "Mechanical Keyboard",
//       "id": "P009",
//       "price": "99.99",
//       "stock": 0,
//       "type": "Accessories",
//       "status": "Out of Stock"
//     },
//     {
//       "name": "Noise Cancelling Headphones",
//       "id": "P010",
//       "price": "199.99",
//       "stock": 45,
//       "type": "Electronics",
//       "status": "In Stock"
//     }

// ];
