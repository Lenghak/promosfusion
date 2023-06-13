import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });

  if (token) return NextResponse.redirect(new URL("/dashboard", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: [],
  matcher: ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"],
};
