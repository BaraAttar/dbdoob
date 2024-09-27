"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import "./style/Navbar.style.css";

// Icons
import home from "@/assets/home.svg";
import cart from "@/assets/cart.svg";
import profile from "@/assets/profile.svg";
import products from "@/assets/products.svg";
import logout from "@/assets/logout.svg";

const links = [
  { href: "/home", src: home, alt: "home" },
  { href: "/admin/dashboard", src: products, alt: "products" },
  { href: "/cart", src: cart, alt: "cart" },
  { href: "/profile", src: profile, alt: "profile" },
  { href: "/logout", src: logout, alt: "logout" },
];

const Navbar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleClick = (href) => {
    if (href === "/logout") {
      logOut()
    } else {
      router.push(href);
    }
  };

  function logOut () {
    deleteCookie('token')
    router.replace("/login");
    router.refresh();
  }


  return (
    <nav className="navbar">
      {links.map(({ href, src, alt }) => (
        <div
          key={href}
          className={`icon ${currentPath === href ? "active" : ""}`}
          onClick={() => handleClick(href)}
        >
          <div>
            <Image src={src} alt={alt} width={25} height={25} />
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
