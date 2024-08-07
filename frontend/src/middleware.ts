import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const url =
    process.env.NEXT_PUBLIC_API_URL_COMPILE || process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(url + "/user", {
    credentials: "include",
    headers: { Cookie: cookies().toString() },
  });
  const isValidUser = response.status === 201;
  const { pathname } = request.nextUrl;
  const pathsToSkip = ["/", "/sign-in", "/sign-up"];
  if (isValidUser && pathsToSkip.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  const pathsToProtect = [
    "/dashboard",
    "/create",
    "/create/order",
    "/create/delivery",
  ];
  if (!isValidUser && pathsToProtect.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
