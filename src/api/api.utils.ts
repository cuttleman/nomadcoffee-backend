import fs from "fs";
import { PhotoG } from "types";

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
