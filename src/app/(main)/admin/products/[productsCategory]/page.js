"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Pagination from "@/app/(main)/components/Pagination";
import SortCard from "../../adminComponents/SortCard";
import Image from "next/image";

// Icon
import editIcon from "@/assets/edit.svg"

export default function page() {
  const params = useParams();
  const productsCategory = params.productsCategory;
  console.log(productsCategory);

  return (
      <div className={styles.productCardsContainer}>
      <SortCard />
        <div className={styles.cardBody}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>صورة المنتج</th>
                  <th className={styles.th}>اسم المنتج</th>
                  <th className={styles.th}>تفاصيل المنتج</th>
                  <th className={styles.th}>تاريخ الاضافة</th>
                  <th className={styles.th}>التصنيف</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {productslist.map((product) => (
                  <tr className={styles.tr} key={product.id}>
                    <td className={styles.td}>{product.id}</td>
                    <td className={styles.td}>{product.name}</td>
                    <td className={styles.td}>{product.details}</td>
                    <td className={styles.td}>{product.addingDate}</td>
                    <td className={styles.td}>{product.category}</td>
                    <td className={styles.td}><Image src={editIcon} width={20} height={20} alt="edit" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
  );
}

const productslist = [
  {
    id: "KW1017",
    name: "KW1017",
    details: "كوشة بحجم 8متر وارتفاع 3 متر",
    addingDate: "2024-8-4",
    src: "https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg",
    alt: "image",
    category: "كوش أ",
  },
  {
    id: "KW1018",
    name: "KW1017",
    details:
      "كوشة بحجم 8مترنولميبنولمنياونمباوفمبنلاومنبا ونبملاومبنورمبولر وارتفاع 3 متر",
    addingDate: "2024-8-4",
    src: "https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg",
    alt: "image",
    category: "كوش أ",
  },
  {
    id: "KW1019",
    name: "KW1017",
    details: "كوشة بحجم 8متر وارتفاع 3 متر",
    addingDate: "2024-8-4",
    src: "https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg",
    alt: "image",
    category: "كوش أ",
  },
];
