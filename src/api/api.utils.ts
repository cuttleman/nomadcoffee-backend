import fs from "fs";
import { PhotoG, Resolver } from "types";

export const localSave = async (
  type: "avatar" | "shop",
  uniqueKey: string | undefined,
  file: PhotoG
): Promise<string> => {
  const { filename, createReadStream } = await file;
  const newFilename = `${type}_${uniqueKey}_${Date.now()}_${filename}`;
  const readStream = createReadStream();
  // /* Only Develop mode, will be remove.
  const writeStream = fs.createWriteStream(
    `${process.cwd()}/${
      process.env.PRODUCTION ? "build" : "src"
    }/uploads/${newFilename}`
  );
  readStream.pipe(writeStream);
  const urlPath = `${
    process.env.PRODUCTION
      ? "https://coffee-server-nomad.herokuapp.com/"
      : "http://localhost:4000/"
  }static/${newFilename}`;
  return urlPath;
};

export const protectedResolver =
  (resolver: any) =>
  (root: any, args: any, context: Resolver.Context, info: any) => {
    // (root, args, context, info)는 서버에서 넣어주는 인자들임 ex> protectedResolver(resolverFn)(root,args,context,info);
    if (!context.loggedUser) {
      throw Error("This action is required logIn");
    }
    return resolver(root, args, context, info);
  };
