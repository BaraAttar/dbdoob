import localFont from "next/font/local";
import "../globals.css";
import Navbar from "./components/Navbar";

const TajawalRegular = localFont({
  src: '../fonts/Tajawal/Tajawal-Regular.ttf',
  variable: '--font-tajawal-regular',
  weight: '400',
});

const TajawalMedium = localFont({
  src: '../fonts/Tajawal/Tajawal-Medium.ttf',
  variable: '--font-tajawal-medium',
  weight: '500',
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      <div className={`${TajawalRegular.variable} ${TajawalMedium.variable}`}>
        {children}
        <Navbar/>
      </div>
  );
}