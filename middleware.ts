import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/actions";

const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/", "/login", "/sign-in"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const sessionCookie = req.cookies.get("session")?.value;

  const session = await decrypt(sessionCookie);
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
