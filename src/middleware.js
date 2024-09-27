import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  
  // console.log("Token:", token); // Debugging

  // Check if the request is for the login page
  const isLoginPage = req.nextUrl.pathname === "/login";

  // Check if the request is for a protected route
  const isProtectedRoute = [
    "/home",
    "/admin",
    "/categorie",
    "/cart",
    "/profile",
  ].some(path => req.nextUrl.pathname.startsWith(path));

  // If no token and trying to access a protected route, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If token exists and trying to access login, redirect to home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Allow access to the requested route if token exists or not protected
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/admin/:path*",
    "/categorie/:path*",
    "/cart/:path*",
    "/profile/:path*",
    "/login",
  ],
};
