import client from "../../../client";
import { protectedResolver } from "../user.utils";
import { UserApi } from "types";

export default {
  Query: {
    seeProfile: protectedResolver(
      async (
        _: any,
        { username }: UserApi.SeeProfile.Args
      ): Promise<UserApi.SeeProfile.Return> => {
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
      }
    ),
  },
};
