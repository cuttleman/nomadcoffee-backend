import client from "../../../client";
import bcrypt from "bcrypt";
import { generateToken } from "../user.utils";

export default {
  Mutation: {
    logIn: async (_, { email, password }) => {
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
