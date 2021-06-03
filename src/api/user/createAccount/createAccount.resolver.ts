import client from "../../../client";
import { passedHashFn } from "../user.utils";
import { UserApi } from "types";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { email, username, password, name, location }: UserApi.CreateAccount.Args
    ): Promise<UserApi.CreateAccount.Return> => {
      // Check user exist or not
      const existedAccount = await client.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
      try {
        if (!existedAccount) {
          await client.user.create({
            data: {
              email,
              username,
              password: await passedHashFn(password),
              name,
              location,
            },
          });
          return { result: true };
        } else {
          // If user existed
          throw Error("email or username already existed");
        }
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
