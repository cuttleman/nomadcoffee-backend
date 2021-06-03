import fs from "fs";
import { PhotoG } from "types";

export const localSave = async (
  type: "avatar" | "shop",
  uniqueKey: string | undefined,
  file: PhotoG
): Promise<string> => {
  const { filename, createReadStream } = await file;
  const newFilename = `${uniqueKey}_${Date.now()}_${filename}`;
  const readStream = createReadStream();
  // /* Only Develop mode, will be remove.
  const writeStream = fs.createWriteStream(
    `${process.cwd()}/${process.env.PRODUCTION ? "build" : "src"}/uploads/${
      type === "avatar" ? "avatar" : "shop"
    }/${newFilename}`
  );
  readStream.pipe(writeStream);
  const urlPath = `${
    process.env.PRODUCTION
      ? "https://coffee-server-nomad.herokuapp.com/"
      : "http://localhost:4000/"
  }static/${type === "avatar" ? "avatar" : "shop"}/${filename}`;
  return urlPath;
};
