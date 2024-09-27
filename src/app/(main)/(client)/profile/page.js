"use client";
import Image from "next/image";
import styles from "./page.module.css";

// icon
import profile from "@/assets/profile.svg";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores/userStore";

export default function page() {
  const { user , restoreUser } = useUserStore();

  const [firstName , setFirstName] = useState('')
 
  useEffect(() => {
    if (!user) {
      console.log(user)
      console.log("restoreUser")
      restoreUser();
    } else {
      setFirstName(user.firstName);
      console.log(user.firstName);
    }
  }, [user, restoreUser]);

  return (
    <div className={styles.profileContainer}>
      <Image
        src={profile}
        alt="Profile"
        className={styles["profile-picture"]}
      />
      <div className={styles["profile-info"]}>
        <h1>{firstName}</h1>
        <p>متجر دبدوب</p>
      </div>
      <p>الطلبات</p>
      <Orders />
    </div>
  );
}

const ordersSections = [
  { id: 3, name: "رفض" },
  { id: 2, name: "معلق" },
  { id: 1, name: "موافقة" },
];
export function Orders() {
  const [curSection, setCurSection] = useState(1);
  return (
    <div className={styles.ordersComponent}>
      {ordersSections.map((section) => (
        <div
          onClick={() => setCurSection(section.id)}
          className={`${styles.orderSection}  ${
            curSection == section.id ? styles.active : ""
          }`}
          key={section.id}
        >
          {section.name}
        </div>
      ))}
    </div>
  );
}
