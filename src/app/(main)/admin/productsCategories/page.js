"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

import add from "@/assets/add-square.svg";
import edit from "@/assets/edit.svg";
import EditCategoryForm from "../adminComponents/EditCategoryForm";
import { useState } from "react";

const categories = [
  { id: 1, name: "كوش فئة أ" },
  { id: 2, name: "كوش فئة ب" },
  { id: 3, name: "ممرات عروسة" },
  { id: 4, name: "مدخل استقبال" },
  { id: 5, name: " مدخل استقبال منزلي  تنسيق مناسبات" },
  { id: 6, name: "تنسيق طاولة صناعي" },
];

export default function page() {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editingCatrgoryInfo, setEditingCatrgoryInfo] = useState('');

  const openEdit = (info) => {
    setEditOpen(true);
    setEditingCatrgoryInfo(info)
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditingCatrgoryInfo('')
  };

  function addNewCategory() {
    console.log("addNewCategory");
  }

  return (
    <div className={styles.productsCategories}>
      <div className={styles.addIconContainer}>
        <Image
          className={styles.addIcon}
          src={add}
          width={30}
          height={30}
          alt="add"
          onClick={() => addNewCategory()}
        />
        <h1>الاقسام</h1>
      </div>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div key={category.id} className={styles.category}>
            <Image
              className={styles.editIcon}
              src={edit}
              width={20}
              height={20}
              alt="edit"
              onClick={() => openEdit(category)}
            />
            <Link href={`./products/${category.id}`}>{category.name}</Link>
          </div>
        ))}
      </div>
      <EditCategoryForm
        info={editingCatrgoryInfo}
        isOpen={isEditOpen}
        onClose={closeEdit}
      />
    </div>
  );
}
