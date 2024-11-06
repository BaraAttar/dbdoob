"use client";
import styles from "./page.module.css";
import Image from "next/image";

import add from "@/assets/add-square.svg";
import CategoryForm from "../../adminComponents/CategoryForm";
import { useEffect, useState } from "react";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import CategoriesList from "../../adminComponents/CategoriesList";

import { Toaster, toast } from "sonner";

export default function Page() {
  // Fetch data
  const {
    categories,
    fetchCategories,
    addStatus,
    deleteStatus,
    submitNewCategory,
    error,
    cleaner,
    response,
  } = useCategoriesStore();

  useEffect(() => {
    if (categories === null) {
      fetchCategories();
    }
  }, []);

  // Category edit or add new Form
  const [isEditOpen, setIsEditOpen] = useState(false);

  const closeForm = () => {
    setIsEditOpen(false);
  };

  function addNewCategory() {
    setIsEditOpen((prev) => !prev);
  }

  function submitting({ categoryName, categoryStatus }) {
    submitNewCategory({ categoryName, categoryStatus });
  }

  // Toaster and cleaner
  useEffect(() => {
    if (addStatus === "fulfilled" || deleteStatus === "fulfilled") {
      toast.success(response);
      closeForm();
      fetchCategories();
      cleaner();
    }
    if (error) {
      toast.error(error);
      cleaner();
    }
  }, [addStatus, deleteStatus, error]);

  return (
    <div className={styles.productsCategories}>
      <Toaster position="top-center" />
      <div className={styles.addIconContainer}>
        <Image
          className={styles.addIcon}
          src={add}
          width={30}
          height={30}
          alt="add"
          onClick={addNewCategory}
        />
        <h1>Categories</h1>
      </div>

      <CategoriesList categoriesList={categories} />

      {/* TODO edit feature */}
      <CategoryForm
        type={"add new"}
        isOpen={isEditOpen}
        closeForm={closeForm}
        submitingInfo={submitting}
        addStatus={addStatus}
      />
    </div>
  );
}
