"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "sonner";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("12345678");
  const { status, login, error } = useUserStore();

  function submit(e) {
    e.preventDefault();
    login(userName, password);
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center" });
    }
    if (status == "fulfilled") {
      router.push("/home");
      router.refresh();
    }
    return () => {
      toast.dismiss();
    };
  }, [status, router]);

  return (
    <>
      <Toaster />
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
        <Link className={styles.link} href="/signup">Create a new account</Link>
      </form>
    </>
  );
}
