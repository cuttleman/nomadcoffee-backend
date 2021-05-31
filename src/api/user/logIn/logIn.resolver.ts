import client from "../../../client";
import bcrypt from "bcrypt";
import { generateToken } from "../user.utils";
import { UserApi } from "types";
import { User } from ".prisma/client";

export default {
  Mutation: {
    logIn: async (
      _: any,
      { email, password }: UserApi.LogIn.Args
    ): Promise<UserApi.LogIn.Return> => {
      try {
        const checkUser: User | null = await client.user.findUnique({
          where: { email },
        });
        if (!checkUser) {
          throw Error("User not found.");
        }

        const comparedPassword: boolean = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (!comparedPassword) {
          throw Error("Not correct password.");
        }

        const token: string = generateToken(checkUser.id);

        return { result: true, token };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
