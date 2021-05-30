import fs from "fs";
import client from "../../../client";
import { passedHashFn, protectedResolver } from "../user.utils";
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
        let avatarUrl;
        try {
          if (loggedUser && "id" in loggedUser) {
            if (avatar) {
              const { filename, createReadStream } = await avatar;
              const newFilename = `${loggedUser.id}_${Date.now()}_${filename}`;
              const readStream = createReadStream();
              // /* Only Develop mode, will be remove.
              const writeStream = fs.createWriteStream(
                `${process.cwd()}/src/uploads/${newFilename}`
              );
              readStream.pipe(writeStream);
              avatarUrl = `http://localhost:4000/static/${filename}`;
              // */
            }
            await client.user.update({
              where: { id: loggedUser.id },
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
          } else {
            throw Error("Can't get an user id");
          }
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
