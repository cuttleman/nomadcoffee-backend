import client from "../../../client";
import { protectedResolver } from "../../api.utils";
import { Resolver, UserApi } from "types";

export default {
  Mutation: {
    toggleFollow: protectedResolver(
      async (
        _: any,
        { id: targetId }: UserApi.ToggleFollow.Args,
        { loggedUser }: Resolver.Context
      ): Promise<UserApi.ToggleFollow.Return> => {
        try {
          const isExist = await client.user.findUnique({
            where: { id: targetId },
          });

          if (!isExist) {
            throw Error("Target User not exist");
          } else if (targetId === loggedUser?.id) {
            throw Error("Followed self");
          }

          const isFollowing = await client.user.count({
            where: {
              id: loggedUser?.id,
              following: { some: { id: targetId } },
            },
          });
          await client.user.update({
            where: { id: loggedUser?.id },
            data: {
              following: {
                [isFollowing ? "disconnect" : "connect"]: { id: targetId },
              },
            },
          });
          return { result: true };
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
