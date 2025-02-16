import {
  Account,
  AuthOptions,
  getServerSession,
  Profile,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import type { DefaultJWT } from "next-auth/jwt";
import client from "./prisma";
import { compareSync } from "bcrypt";
import { createUser, findUser, updateUser } from "@/utils/database/user.query";
import { AdapterUser } from "next-auth/adapters";

interface exampleSiswaProps {
  name: string;
  email: string;
  password: string;
}

interface ExtendedUser extends AdapterUser {
  role: string;
}
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      password: string;
      name: string;
      role: string;
      user_pic: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    user_pic: string;
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
    error: "/AccessDenied",
  },
  providers: [
    CredentialsProvider({
      name: "PILKETOS redentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Masukkan Email Anda",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Masukkan Password Anda",
        },
      },
      async authorize(credentials) {
        try {
          const findUser = await client.user.findUnique({
            where: {
              email: credentials?.email,
            },
            include: { User_Auth: true },
          });

          if (!findUser) return null;

          const ComparePassword = compareSync(
            credentials?.password as string,
            findUser.User_Auth?.password as string,
          );

          if (!ComparePassword) return null;

          const user = {
            id: findUser.id,
            email: findUser.email,
            name: findUser.name,
            password: findUser.User_Auth?.password,
            role: findUser.role,
            picture: findUser.user_pic,
          };
          return user;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? new URL(url, baseUrl).toString() : url;
    },
    async signIn({ user, account }) {
      try {
        // if (!user?.email?.includes("smktelkom-mlg.sch.id")) {
        //   return false;
        // }
        if (account?.provider === "credentials" && !user.email) {
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user?.email) {
          const userDatabase = await findUser({ email: user.email });
          if (userDatabase) {
            token.email = userDatabase.email;
            token.password = userDatabase.User_Auth?.password || "";
            token.role = userDatabase.role;
            token.id = userDatabase.id;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token.email && session.user) {
          session.user.id = token.id;
          session.user.email = token.email || "";
          session.user.name = token.name || "";
          session.user.password = token.password || "";
          session.user.user_pic =
            token.picture ||
            "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png";
          session.user.role = token.role || "SISWA";
          await updateUser(
            { email: token.email },
            { User_Auth: { update: { last_login: new Date() } } },
          );
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const nextGetServerSession = () => getServerSession(authOptions);
