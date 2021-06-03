import client from "../../client";
import { Resolver, UserApi } from "types";

export default {
  User: {
    isFollowing: async (
      parent: UserApi.User,
      _: any,
      { loggedUser }: Resolver.Context
    ): Promise<boolean> => {
      const result = await client.user.count({
        where: { id: loggedUser?.id, following: { some: { id: parent.id } } },
      });
      if (result) {
        return true;
      } else {
        return false;
      }
    },
    isSelf: async (
      parent: UserApi.User,
      _: any,
      { loggedUser }: Resolver.Context
    ): Promise<boolean> => {
      return parent.id === loggedUser?.id;
    },
  },
};
