"use client";
import styles from "./styles/EditCategoryForm.module.css";
import { useState } from "react";
import SortInput from "./SortInput";

// icone
import closeIcon from "@/assets/close-square.svg";
import Image from "next/image";

export default function EditCategoryForm({
  type,
  addStatus,
  isOpen,
  closeForm,
  submitingInfo,
}) {
  if (!isOpen) return null;

  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("");

  const options = ["Active", "Inactive"];

  function handleOptionSelect(option) {
    setCategoryStatus(option);
  }

  function onSubmitForm() {
    if (categoryName && categoryStatus) {
      submitingInfo({ categoryName, categoryStatus });
    }
  }

  return (
    <div className={styles.FormOverlay} onClick={closeForm}>
      <div className={styles.FormContent} onClick={(e) => e.stopPropagation()}>
        {type == "add new" ? <h1>add new category</h1> : ""}
        <input
          type="text"
          className={styles.input}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />

        <SortInput
          type={"Status"}
          options={options}
          onOptionSelect={handleOptionSelect}
        />

        <Image
          className={styles.closeButton}
          onClick={closeForm}
          src={closeIcon}
          width={30}
          height={30}
          alt="close"
        />

        {/* <button type="submit" className={styles.deletCategoryBtn}>
          حذف التصنيف
        </button> */}
        <div>
          <p className={addStatus === "pending" ? styles.loader : ""}></p>

          <button
            onClick={() => onSubmitForm()}
            type="submit"
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
