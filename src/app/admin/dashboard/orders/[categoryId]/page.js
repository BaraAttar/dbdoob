"use client";
import { useParams } from "next/navigation";
import React from "react";

import styles from "./page.module.css";
import SortCard from "@/app/admin/dashboard/products/components/SortCard";
import Pagination from "@/app/components/Pagination";

export default function page() {
  const params = useParams();
  const categoryId = params.categoryId;

 
  return (
    <div className={styles.productCardsContainer}>
      <h1>الطلبات</h1>
    <SortCard/>
      <div className={styles.cardBody}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>رقم الطلب</th>
                <th className={styles.th}>اسم المنتج</th>
                <th className={styles.th}>العميل</th>
                <th className={styles.th}>معلومات الحجز</th>
                <th className={styles.th}>حالة الحجز</th>
                <th className={styles.th}>تاريخ الحجز</th>
                <th className={styles.th}>تاريخ الطلب</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {orderslist.map((order) => (
                <tr className={styles.tr} key={order.id}>
                  <td className={styles.td}>{order.id}</td>
                  <td className={styles.td}>{order.name}</td>
                  <td className={styles.td}>
                    <p>{order.customer}</p>
                    <p> {order.phone}</p>
                  </td>
                  <td className={styles.td}>{order.details}</td>
                  <td className={`${styles.td} ${styles.orderStatus}`}>
                    {order.status}
                  </td>
                  <td className={styles.td}>{order.bookingDate}</td>
                  <td className={styles.td}>{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <Pagination/>
      </div>
    </div>
  );
}

const orderslist = [
  {
    id: "KW1017",
    name: "KW1017",
    details: "كوشة بحجم 8متر وارتفاع 3 متر",
    customer: "محمد احمد",
    phone: "0502349876",
    bookingDate: "2024-8-4",
    orderDate: "2024-9-8",
    src: "https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg",
    alt: "image",
    status: "موافقة",
  },
  {
    id: "KW1018",
    name: "KW1018",
    details: "كوشة بحجم 8متر وارتفاع 3 متر",
    customer: "محمد ايوب",
    phone: "0502349876",
    bookingDate: "2024-8-5",
    orderDate: "2024-9-10",
    src: "https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg",
    alt: "image",
    status: "موافقة",
  },
];
