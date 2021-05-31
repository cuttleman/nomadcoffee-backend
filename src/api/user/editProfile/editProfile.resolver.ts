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
        let avatarUrl: string = "";
        try {
          if (avatar) {
            const { filename, createReadStream } = await avatar;
            const newFilename: string = `${
              loggedUser?.id
            }_${Date.now()}_${filename}`;
            const readStream = createReadStream();
            // /* Only Develop mode, will be remove.
            const writeStream: fs.WriteStream = fs.createWriteStream(
              `${process.cwd()}/src/uploads/${newFilename}`
            );
            readStream.pipe(writeStream);
            avatarUrl = `http://localhost:4000/static/${filename}`;
            // */
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
