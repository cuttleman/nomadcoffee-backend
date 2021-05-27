import client from "../../../client";
import { passedHashFn } from "../user.utils";

export default {
  Mutation: {
    createAccount: async (_, { email, username, password, name, location }) => {
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
          return { ok: true };
        } else {
          // If user existed
          throw Error("email or username already existed");
        }
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },
  },
};
