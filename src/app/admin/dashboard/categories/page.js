"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

import add from "@/assets/add-square.svg";
import edit from "@/assets/edit.svg";
import EditCategoryForm from "../../adminComponents/EditCategoryForm";
import { useEffect, useState } from "react";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import { useRouter } from "next/navigation";

export default function page() {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editingCategoryInfo, seteditingCategoryInfo] = useState("");
  const { status, fetchCategories, error } = useCategoriesStore();

  const [categories, setCategories] = useState();

  useEffect(() => {
    const savedCategories = sessionStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      fetchCategories();
    }
  }, [status, fetchCategories]);

  const openEdit = (info) => {
    setEditOpen(true);
    seteditingCategoryInfo(info);
    console.log(info);
  };

  const closeEdit = () => {
    setEditOpen(false);
    seteditingCategoryInfo("");
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

function Categories({ categories, openEdit }) {
  const router = useRouter()
  console.log(categories);
  function openCategory(id) {
    console.log(id);
    router.push(`/admin/dashboard/products/${id}`)
  }
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Products</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id}>
              <td
                onClick={() => openCategory(category.name)}
                className={styles.td}
              >
                {category.name}
              </td>
              <td className={styles.td}>{category.products}</td>
              <td className={styles.td}>
                <p className={styles.active}>{category.status}</p>
              </td>
              <td className={styles.td}>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// const categoriesList = [
//   { id: "1221", name: "apple", products: 35, status: "active" },
//   { id: "1232", name: "samsung", products: 21, status: "active" },
//   { id: "1223", name: "huawei", products: 23, status: "active" },
//   { id: "1224", name: "xiaome", products: 15, status: "inactive" },
//   { id: "1225", name: "oppo", products: 40, status: "active" },
//   { id: "1226", name: "asuse", products: 33, status: "active" },
//   { id: "1227", name: "oneplus", products: 22, status: "inactive" },
//   { id: "1228", name: "google", products: 29, status: "active" },
//   { id: "1229", name: "sony", products: 10, status: "inactive" },
//   { id: "1230", name: "lg", products: 19, status: "active" },
//   { id: "1231", name: "motorola", products: 17, status: "inactive" },
//   { id: "1233", name: "nokia", products: 27, status: "active" },
//   { id: "1234", name: "lenovo", products: 24, status: "inactive" },
//   { id: "1235", name: "realme", products: 30, status: "active" },
//   { id: "1236", name: "honor", products: 12, status: "active" },
//   { id: "1237", name: "htc", products: 25, status: "inactive" },
//   { id: "1238", name: "vivo", products: 26, status: "active" },
//   { id: "1239", name: "meizu", products: 16, status: "inactive" },
//   { id: "1240", name: "alcatel", products: 8, status: "active" },
//   { id: "1241", name: "micromax", products: 11, status: "inactive" },
//   { id: "1242", name: "infinix", products: 20, status: "active" },
//   { id: "1243", name: "zte", products: 14, status: "inactive" },
//   { id: "1244", name: "blackberry", products: 18, status: "active" },
//   { id: "1245", name: "acer", products: 9, status: "inactive" },
//   { id: "1246", name: "panasonic", products: 13, status: "active" },
//   { id: "1247", name: "gionee", products: 7, status: "inactive" },
//   { id: "1248", name: "lava", products: 6, status: "active" },
//   { id: "1249", name: "tecno", products: 5, status: "active" },
//   { id: "1250", name: "blu", products: 4, status: "inactive" },
//   { id: "1251", name: "jio", products: 3, status: "active" },
// ];
