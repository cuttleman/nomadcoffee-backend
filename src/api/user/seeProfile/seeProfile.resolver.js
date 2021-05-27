import client from "../../../client";
import { protectedResolver } from "../user.utils";

export default {
  Query: {
    seeProfile: protectedResolver(async (_, { username }) => {
      try {
        const user = await client.user.findUnique({ where: { username } });
        if (user) {
          return { result: true, user };
        } else {
          throw Error("Not Found specific User from username");
        }
      } catch (error) {
        return { result: false, error: error.message };
      }
    }),
  },
};
