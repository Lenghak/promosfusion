import { signInService } from "@/lib/axios/auth";

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "@/types/auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, _req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("http://couponapi.textura-art.com/auth/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        const res = await signInService({
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = await res?.data;

        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
        return res?.status === 200 && user
          ? { ...user.user, token: user.token }
          : null;
      },
    }),
  ],
  pages: { signIn: "/sign-in", error: "/sign-in" },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as User;
      return session;
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
};

export { authOptions };
