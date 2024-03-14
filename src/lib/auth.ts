import { jwtUtils } from "@/utils/jwt";
import type { NextAuthOptions, Session, TokenSet, User } from "next-auth";
import credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        access_token: {
          placeholder: "access_token",
          type: "access_token",
          label: "access_token",
        },
      },
      authorize(credentials, req) {
        try {
          if (!credentials?.access_token)
            throw new Error("invalid credentials");

          const { _id } = jwtUtils.verifyToken(credentials.access_token);

          return {
            id: _id,
            access_token: credentials.access_token,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session({
      session,
      token,
    }: {
      session: Session | any;
      user: User;
      token: TokenSet;
    }) {
      session.user.id = token.id;
      session.user.access_token = token.access_token;
      return session;
    },
    jwt({
      token,
      user,
      account,
    }: {
      token: JWT | any;
      user?: any;
      account?: any;
      profile?: any;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.access_token = user?.access_token;
      }
      return token;
    },
  },
};
