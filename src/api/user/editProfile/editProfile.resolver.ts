import fs from "fs";
import client from "../../../client";
import { passedHashFn, protectedResolver } from "../user.utils";
import { Resolver, UserApi } from "types";
import { localSave } from "../../api.utils";

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
