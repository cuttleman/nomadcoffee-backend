import client from "../../../client";
import bcrypt from "bcrypt";
import { generateToken } from "../user.utils";
import { UserApi } from "types";

export default {
  Mutation: {
    logIn: async (
      _: any,
      { email, password }: UserApi.LogIn.Args
    ): Promise<UserApi.LogIn.Return> => {
      try {
        const checkUser = await client.user.findUnique({
          where: { email },
        });
        if (!checkUser) {
          throw Error("User not found.");
        }

        const comparedPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (!comparedPassword) {
          throw Error("Not correct password.");
        }

        const token = generateToken(checkUser.id);

        return { result: true, token };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
