import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import Image from "next/image";
import { toast } from "sonner";

// store
import { useProductsStore } from "@/stores/useProducts";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

// Icon
import add from "@/assets/add-square.svg";
import ImageUploader from "./ImageUploader";

export default function AddProduct({addStatus , category}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleForm() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <div onClick={toggleForm} className={styles.addProductBtn}>
        <Image alt="add icon" src={add} width={20} height={20} />
        <p style={{color : "#fff" , margin:"0px"}}>add product</p>
      </div>
      {isOpen && <AddProductForm addStatus={addStatus} category={category} closeForm={toggleForm} />}
    </div>
  );
}

export function AddProductForm({ closeForm , addStatus , category }) {
  const { addProduct } = useProductsStore();
  const {fetchCategories} = useCategoriesStore();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "iphone test",
    description: "test",
    category: category ,
    price: "1000",
    cost: "299",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    
    const { name, description, category, price, cost } = formData;

    if (!name || !description || !category || !price || !cost) {
      toast.error("Name, description, category, price, and cost are required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("description", description);
    formDataToSend.append("category", category);
    formDataToSend.append("price", price);
    formDataToSend.append("cost", cost);
  
    // Append file if it exists
    if (file) {
      formDataToSend.append("file", file);
    }
    addProduct(formDataToSend);
  };

  useEffect(()=>{
    if (addStatus === "fulfilled") {
      fetchCategories()
      closeForm()
    }
  },[addStatus])

  return (
    <div className={styles.formOverlay} onClick={closeForm}>
      <div className={styles.formContent} onClick={(e) => e.stopPropagation()}>
        <h3>Add new product</h3>
        <ImageUploader setFile={setFile} />
        
        <p>Product Name</p>
        <input
          type="text"
          className={styles.input}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        
        <p>Description</p>
        <input
          type="text"
          className={styles.input}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        
        <p>Category</p>
        <input
          type="text"
          className={styles.input}
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <div className={styles.priceAndCost}>
          <div>
            <p>Price</p>
            <input
              type="text"
              className={styles.input}
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </div>
          <div>
            <p>Cost</p>
            <input
              type="text"
              className={styles.input}
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost"
            />
          </div>
        </div>
        <div>
        <p className={addStatus === "pending" ? styles.loader : ""}></p>
        <button className={styles.submitButton} onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
