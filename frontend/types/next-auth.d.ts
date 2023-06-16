import { DefaultUser } from "next-auth";
import NextAuth from "next-auth/next";

import { User as CustomUser } from "./auth";

declare module "next-auth" {
  interface User extends CustomUser {}

  interface Session {
    user: User;
  }
}
