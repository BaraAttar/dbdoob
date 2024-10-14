"use client";

import { Input } from "@mui/material";
import styles from "./styles/EditCategoryForm.module.css";
import { useState } from "react";

// icone
import closeIcon from "@/assets/close-square.svg";
import Image from "next/image";

export default function EditCategoryForm({ isOpen, onClose, info }) {
  if (!isOpen) return null;

  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.FormOverlay} onClick={onClose}>
      <div className={styles.FormContent} onClick={(e) => e.stopPropagation()}>
        <h1> تعديل الصنف :{info.name} </h1>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="تعديل الاسم"
        />

        <Image
          className={styles.closeButton}
          onClick={onClose}
          src={closeIcon}
          width={30}
          height={30}
          alt="close"
        />

        <button type="submit" className={styles.deletCategoryBtn}>
          حذف التصنيف
        </button>
        <button type="submit" className={styles.submitButton}>
          تعديل
        </button>
      </div>
    </div>
  );
}
