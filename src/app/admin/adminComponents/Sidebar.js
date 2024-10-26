"use client";
import React, { useState } from "react";
import styles from "./styles/Sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// icons
import logo from "@/assets/dashboard/logo.svg";
import analysis from "@/assets/dashboard/analysis.svg";
import orders from "@/assets/dashboard/orders.svg";
import products from "@/assets/dashboard/products.svg";
import categories from "@/assets/dashboard/category.svg";
import logout from "@/assets/dashboard/logout.svg";
import { deleteCookie } from "cookies-next";

const linklist = [
  { key: 1, src: analysis, href: "/admin/dashboard/analysis", alt: "Analysis" },
  { key: 2, src: orders, href: "/admin/dashboard/orders", alt: "Orders" },
  { key: 3, src: products, href: "/admin/dashboard/products", alt: "Products" },
  {
    key: 4,
    src: categories,
    href: "/admin/dashboard/categories",
    alt: "Categories",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const currentPath = usePathname();

  function navigate(href) {
    router.replace(href);
  }

  function handleLogout() {
    deleteCookie("token");
    router.replace("login");
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src={logo} priority={true} alt="logo" width={50} height={50} />
        <h1>Logo</h1>
      </div>
      <ul>
        {linklist.map(({ key, href, alt, src }) => (
          <li
            onClick={() => {
              navigate(href);
            }}
            key={key}
            className={`${styles.link} ${
              currentPath.includes(href) ? styles.active : ""
            }`}
          >
            <Image src={src} alt={alt} width={30} height={30} />
            <p>{alt}</p>
          </li>
        ))}
      </ul>
      <div onClick={handleLogout} className={styles.link}>
        <Image src={logout} alt="logout" width={30} height={30} />
        <p>Log Out</p>
      </div>
    </div>
  );
}
