import fs from "fs";
import client from "../../../client";
import { passedHashFn } from "../user.utils";
import { localSave, protectedResolver } from "../../api.utils";
import { Resolver, UserApi } from "types";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _: any,
        {
          email,
          username,
          name,
          location,
          password,
          avatar,
        }: UserApi.EditProfile.Args,
        { loggedUser }: Resolver.Context
      ): Promise<UserApi.EditProfile.Return> => {
        let avatarUrl: string = "";
        try {
          if (avatar) {
            avatarUrl = await localSave("avatar", loggedUser?.id, avatar);
          }
          await client.user.update({
            where: { id: loggedUser?.id },
            data: {
              email,
              username,
              name,
              location,
              ...(password && { password: await passedHashFn(password) }),
              ...(avatarUrl && { avatarUrl }),
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
