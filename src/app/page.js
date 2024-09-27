"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); 
  useEffect(()=>{
    router.push('/login'); 

  },[])
  return (
    <main className={styles.main}>
    </main>
  );
}
