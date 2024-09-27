import Link from "next/link";
import styles from "./styles/Orders.module.css";


const ordersCategories = [
  { id: "expted", name: "موافقه", orders: 5, color: "var(--green)" },
  { id: "pending", name: "معلق", orders: 3, color: "var(--blue)" },
  { id: "rejected", name: "تم الرفض", orders: 2, color: "var(--red)" },
  { id: "all", name: "كل الطلبات", orders: "...", color: "gray" },
];

// imported in 'admin/dashboard/page.js'
export default function OrdersCategories() {
  return (
    <div className={styles.orders}>
      <p>الطلبات</p>
      <ul className={styles.CategoriesContainer}>
        {ordersCategories.map((Category) => {
          return (
            <Link
            href={`/admin/orders/${Category.id}`}
              key={Category.id}
              className={styles.Category}
              style={{ backgroundColor: Category.color }}
            >
              <p>{Category.name}</p>
              <h1>{Category.orders}</h1>
            </Link>
          );
        })}
      </ul>
      
    </div>
  );
}

