"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

import add from "@/assets/add-square.svg";
import edit from "@/assets/edit.svg";
import EditCategoryForm from "../adminComponents/EditCategoryForm";
import { useEffect, useState } from "react";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

export default function page() {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editingCategoryInfo, seteditingCategoryInfo] = useState("");

  // const [categories , setCategories] =  useState(() => {
  //   const savedCategories = sessionStorage.getItem('categories');
  //   return savedCategories ? JSON.parse(savedCategories) : [];
  // });

  const { categories, status, fetchCategories, error } = useCategoriesStore();
  const openEdit = (info) => {
    setEditOpen(true);
    seteditingCategoryInfo(info);
    console.log(info)
  };

  const closeEdit = () => {
    setEditOpen(false);
    seteditingCategoryInfo("");
  };

  function addNewCategory() {
    console.log("addNewCategory");
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   console.log(categories);
  //   console.log(status);
  //   console.log(`Error Cat: ${error}`);
  //   // const fetchCategories = async () => {
  //   // };
  //   // fetchCategories();
  // }, [categories, status, error]);

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
      {status === "pending" ? (
        "Loading..."
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Categories categories={categories} openEdit={openEdit} />
      )}
      <EditCategoryForm
        info={editingCategoryInfo}
        isOpen={isEditOpen}
        onClose={closeEdit}
      />
    </div>
  );
}

function Categories({ categories , openEdit }) {
  return (
    <div className={styles.categoriesContainer}>
      {categories?.map((category) => (
        <div key={category._id} className={styles.category}>
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
  );
}
