"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

import { Toaster, toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("ffffff");
  const [lastName, setLastName] = useState("ffffff");
  const [phoneNumber, setphoneNumber] = useState("055555555");
  const [email, setEmail] = useState("ffffff@gmail.com");
  const [userName, setUsername] = useState("fffffff");
  const [password, setPassword] = useState("b12345678");
  const [confirmPassword, setConfirmPassword] = useState("b12345678");

  const { status, signup, error } = useUserStore();

  function submit(e) {
    e.preventDefault();

    // Regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z]+$/; // Only letters
    const userNameRegex = /^[a-zA-Z0-9._-]{6,}$/; // At least 3 characters (letters, digits, _, -)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

    // Validations
    if (!emailRegex.test(email)) {
      toast.error("Invalid email", { position: "top-center" });
      return;
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      toast.error("Name must contain only letters", {
        position: "top-center",
      });
      return;
    }

    if (!userNameRegex.test(userName)) {
      toast.error(
        "Username must be at least 6 characters long and can include letters, numbers, underscores, or hyphens",
        {
          position: "top-center",
        }
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be 8+ characters with letters and numbers", {
        position: "top-center",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don’t match", { position: "top-center" });
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required", { position: "top-center" });
      return;
    }

    signup(firstName, lastName, userName, phoneNumber, email, password);
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
  }, [status, router, router]);

  return (
    <>
      <Toaster />
      <form className={styles.form}>
        <h3 className={styles.h3}>Create a new account</h3>
        <div className={styles.fullname_field}>
          <div>
            <label className={styles.label} htmlFor="firstName">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              required
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="lastName">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              required
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <label className={styles.label} htmlFor="username">
          User Name
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className={styles.input}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label} htmlFor="password">
          Password
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
        <label className={styles.label} htmlFor="confirmPassword">
          Repeat Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={submit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
