import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

const AUTH_PATHS = [
  /^\/sign-in/,
  /^\/sign-up/,
  /^\/forgot-password/,
  /^\/reset-password/,
];

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPath = AUTH_PATHS.some((path) => path.test(pathname));
  const token = await getToken({
    req: request,
  });

  if (token && isAuthPath)
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (!isAuthPath && !token)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  if (pathname.startsWith("/dashboard") && token?.role === "seller")
    return NextResponse.redirect(new URL("/campaigns", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico$|svg|images|coupon|manifest).*)"],
};
