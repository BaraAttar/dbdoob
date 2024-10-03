"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("12345678");
  const { status, fetchUserData, error } = useUserStore();

  function submit(e) {
    e.preventDefault();
    fetchUserData(userName, password);
  }

  useEffect(() => {
    console.log(error);
    if (status == "fulfilled") {
      router.push("/home");
      router.refresh();
    }
  }, [status, router]);

  return (
    <>
      <form className={styles.form}>
        <h3 className={styles.h3}>مرحباً بعودتك</h3>
        <label className={styles.label} htmlFor="email">
          اسم المستخدم
        </label>
        <input
          type="text"
          id="text"
          name="text"
          placeholder="userName"
          required
          className={styles.input}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className={styles.label} htmlFor="password">
          كلمة المرور
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>هل نسيت كلمة السر؟</p>
        <div>
          <p className={status === "pending" ? styles.loader : ""}></p>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={submit}
          >
            تسجيل الدخول
          </button>
        </div>
        <p>انشاء حساب</p>
      </form>
    </>
  );
}
