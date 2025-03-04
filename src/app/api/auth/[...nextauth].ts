import { connectToDatabase } from "@/lib/dbconnect";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentails",
      credentials: {},
      async authorize(credentials, req) {
        const { userId, password } = req.body as {
          userId: string;
          password: string;
        };
        const dbConnect = await connectToDatabase();
        const findUser = await dbConnect.db
          ?.collection("users")
          .findOne({ id: userId });
        if (!findUser) {
          throw Error("Unregisterd User");
        }
        const compare = await bcrypt.compare(password, findUser.pw);
        if (!compare) {
          throw Error("Password is not correct");
        }
        const resUser = {
          id: findUser.id,
          name: findUser.name,
          userType: findUser.userType,
          companyId: findUser.companyId,
        };

        return resUser;
      },
    }),
  ],
  callbacks: {
    jwt: (params) => {
      const { user, session, trigger, token } = params;

      return token;
    },
    session: (params) => {
      const { user, session } = params;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
};

export default NextAuth(authOptions);
