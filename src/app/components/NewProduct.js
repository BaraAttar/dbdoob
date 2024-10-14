"use client";
import styles from "./style/NewProduct.style.css";
import { useState } from "react";

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    sku: "",
  });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.imageUrl ||
      !product.category ||
      !product.sku
    ) {
      setError("يرجى ملئ جميع الخانات");
      return;
    }

    try {
      // Placeholder for API call
      console.log("New Product:", product);
      // await fetch('/api/products', { method: 'POST', body: JSON.stringify(product) });

      // Clear form
      setProduct({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
        sku: "",
      });
      setImagePreview("");
      setError("");
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProduct({ ...product, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`${styles.container} ${styles.card}`}>
      <h3 className={styles.h3}>اضافة منتج</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="اسم المنتج"
        />
        <input
          className={styles.input}
          type="text"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="وصف المنتج"
        />
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product Preview"
            className={styles.imagePreview}
          />
        )}
        <input
          className={styles.input}
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="سعر المنتج"
        />
        <input
          className={styles.input}
          type="text"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          placeholder="فئة المنتج"
        />
        <input
          className={styles.input}
          type="text"
          value={product.sku}
          onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          placeholder="رقم المنتج"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          اضافة المنتج
        </button>
      </form>
    </div>
  );
};

