import React, { useState } from "react";
import styles from "./ImageUploader.module.css";
import Image from "next/image";

// icom
import upload from "@/assets/dashboard/upload.svg";
import close from "@/assets/dashboard/close.svg";

export default function ImageUploader({ setFile }) {
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png" , "image/avif" , "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload an image file (JPEG, PNG , AVIF , WEBP).");
        return;
      }
      if (file.size > 5000000) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
      setFileSize((file.size / 1000).toFixed(2));
      setFile(file);
    }
  };

  function clearFile() {
    setImagePreview(null);
    setFileName(null);
    setFileSize(null);
    setFile(null);

    const imageInput = document.querySelector("#imageInput");
    if (imageInput) {
      imageInput.value = null;
    }
  }

  return (
    <form
      className={styles.form}
      onClick={() => document.querySelector("#imageInput").click()}
    >
      <input
        onChange={handleImageChange}
        id="imageInput"
        type="file"
        accept="image/*"
        hidden
      />
      {imagePreview ? (
        <div
          className={styles.imagePreview_row}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            className={styles.imagePreview}
            src={imagePreview}
            alt="Preview"
            width={50}
            height={50}
          />
          <div>
            <p style={{ fontWeight: "bold" }}>{fileName}</p>
            <p>{fileSize} KB</p>
          </div>
          <Image
            onClick={clearFile}
            alt="close"
            className={styles.close}
            src={close}
            width={20}
            height={20}
          />
        </div>
      ) : (
        <>
          <Image
            alt="upload"
            className={styles.icon}
            src={upload}
            width={25}
            height={25}
          />
          <p>Choose image file to upload</p>
        </>
      )}
    </form>
  );
}
