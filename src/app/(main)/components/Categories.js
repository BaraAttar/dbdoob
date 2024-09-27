import Link from "next/link";
import styles from "./style/Categories.module.css";


const categories = [
  { id: 1, name: "كوش فئة أ" },
  { id: 2, name: "كوش فئة ب" },
  { id: 3, name: "ممرات عروسة" },
  { id: 4, name: "مدخل استقبال" },
  { id: 5, name: " مدخل استقبال منزلي  تنسيق مناسبات" },
  { id: 6, name: "تنسيق طاولة صناعي" },
];

// icons
import arch from "@/assets/categries/arch.png";
import Image from "next/image";
import Calendar from "../(client)/components/Calendar";

// this component imported in main 'page/js'
export default function Categories() {
  return (
    <div className={styles.categories}>
      <Calendar />
      <h1>الاقسام</h1>
      <ul className={styles.categoriesContainer}>
        {categories.map((category) => (
          // ../(client)/categories/[categoryId]/page.js
          <Link key={category.id} href={`../categorie/${category.id}`}>
            <li className={styles.card}>
              <Image alt={category.name} className={styles.icon} src={arch} width={80} hight={80} />
              <h1>{category.name}</h1>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
