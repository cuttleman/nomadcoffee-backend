import fs from "fs";
import client from "../../../client";
import { passedHashFn, protectedResolver } from "../user.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { email, username, name, location, password, avatar },
        { loggedUser }
      ) => {
        let avatarUrl;
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
        try {
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
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
