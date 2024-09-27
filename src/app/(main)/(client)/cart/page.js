"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

import trash from "@/assets/trash.svg";
import emptyCart from "@/assets/empty-cart.png";

export default function page() {
  const [isEmpty, setIsempty] = useState(false);
  const links = [
    {
      id: "KW1017",
      name: "KW1017",
      detail: "كوشة بحجم 8متر وارتفاع 3 متر",
      src: "https://i.pinimg.com/736x/60/4b/7c/604b7c5e0854ca82a80a95e49deda0f3.jpg",
      alt: "image",
    },
  ];

  const hanedleClick = (id) => {
    console.log(id);
  };
  const hanedleDelete = (id) => {
    console.log("delete", id);
  };
  return (
    <>
      {isEmpty ? (
        <div className={styles.cartIsEmpty}>
          <Image src={emptyCart} alt={"empty-cart"} width={100} height={100} />
          <h1>! السلة فارغة</h1>
        </div>
      ) : (
        <div className={styles.cart}>
          <div className={styles.productsContainer}>
            {/*product list*/}
            {links.map(({ id, name, detail, src, alt }) => (
              <div key={id} className={styles.cartProduct}>
                <Image
                  onClick={() => hanedleClick(id)}
                  src={src}
                  alt={alt}
                  width={60}
                  height={60}
                />
                <div>
                  <h3 style={{ margin: "0" }}>{name}</h3>
                  <p style={{ margin: "0" }}>{detail}</p>
                </div>
                <button
                  onClick={() => hanedleDelete(id)}
                  type="delete"
                  className={styles.deleteButton}
                >
                  <Image src={trash} alt={alt} width={25} height={25} />
                </button>
              </div>
            ))}
            {/*end of product list*/}
          </div>
          <button type="submit" className={styles.submitButton}>
            حجز
          </button>
        </div>
      )}
    </>
  );
}
