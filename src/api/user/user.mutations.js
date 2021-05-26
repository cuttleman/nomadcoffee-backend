import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { email, username, password, name = "", location = "" }
    ) => {
      // Check user exist or not
      const existedAccount = await client.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
      try {
        if (!existedAccount) {
          // Password convert to ugly string via Hash fn
          const hashedPassword = await bcrypt.hash(password, 10);
          await client.user.create({
            data: {
              email,
              username,
              password: hashedPassword,
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
