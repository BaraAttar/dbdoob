"use client"

import { useState } from "react";
import styles from "./page.module.css";
import Products from "../adminComponents/Products";
import OrdersCategorys from "../adminComponents/OrdersCategorys";
import Link from "next/link";
import Sort from "../adminComponents/SortInput";

export default function Dashboard() {

  return (
    <div className={styles.dashboard}>
      <h1>لوحة التحكم</h1>
      {/* <Products/> */}
      <OrdersCategorys />
      <div className={styles.links}>
        <Link href="">حسابات العملاء</Link>
        <Link href="/admin/productsCategories">تصنيفات المنتجات</Link>
        <Link href={`/admin/products/${"all"}`}>المنتجات</Link>
      </div>
    </div>
  );
}
