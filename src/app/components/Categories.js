import Link from "next/link";
import styles from "./style/Categories.module.css";

import { useCategoriesStore } from "@/stores/useCategoriesStore";

// icons
import arch from "@/assets/categries/arch.png";
import Image from "next/image";
import Calendar from "@/app/components/Calendar";
import { useEffect, useState } from "react";

// this component imported in main 'page/js'
export default function Categories() {
  const { status, fetchCategories, error } = useCategoriesStore();

  const [categories , setCategories] =  useState()

  useEffect(() => {
    const savedCategories = sessionStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      fetchCategories();
    }
  }, [status, fetchCategories]);

  return (
    <div className={styles.categories}>
      <Calendar />
      <h1>الاقسام</h1>
      <ul className={styles.categoriesContainer}>
        {categories?.map((category) => (
          // ../(client)/categories/[categoryId]/page.js
          <Link key={category._id} href={`../categorie/${category.id}`}>
            <li className={styles.card}>
              <Image
                alt={category.name}
                className={styles.icon}
                src={arch}
                width={80}
                hight={80}
              />
              <h1>{category.name}</h1>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
