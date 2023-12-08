import "next-auth";

import { type User as CustomUser } from "./auth";

declare module "next-auth" {
  interface User extends CustomUser {}

  interface Session {
    user: User;
  }
}
