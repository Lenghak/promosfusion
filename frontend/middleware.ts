import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

const AUTH_PATHS = [
  /^\/sign-up/,
  /^\/sign-in/,
  /^\/forgot-password/,
  /^\/reset-password/,
];

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });
  const pathname = request.nextUrl.pathname;

  const isAuthPath = AUTH_PATHS.some((regex) => regex.test(pathname));

  if (token && isAuthPath)
    return NextResponse.redirect(new URL("/dashboard", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: ["/sign-in", "/sign-up", "/forgot-password", "reset-password"],
  matcher: ["/((?!api|_next|static|favicon.ico|svg).*)"],
};
