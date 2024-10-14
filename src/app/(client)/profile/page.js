"use client";
import Image from "next/image";
import styles from "./page.module.css";

// icon
import profile from "@/assets/profile.svg";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";

export default function page() {
  const { status ,restoreUser } = useUserStore();

  const [userInfo, setUserInfo] = useState("");

  
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      console.log("restoreUser");
      restoreUser();
    } else {
      setUserInfo(JSON.parse(storedUser));
    }
  }, [status ,restoreUser]);

  return (
    <div className={styles.profileContainer}>
      <Image
        src={profile}
        alt="Profile"
        className={styles["profile-picture"]}
      />
      <div className={styles["profile-info"]}>
        <h1>{userInfo.firstName}</h1>
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
