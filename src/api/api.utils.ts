import fs from "fs";
import { PhotoG } from "types";

export const localSave = async (
  type: "avatar" | "shop",
  uniqueKey: string | undefined,
  file: PhotoG
): Promise<string> => {
  const { filename, createReadStream } = await file;
  console.log(filename);
  const newFilename: string = `${uniqueKey}_${Date.now()}_${filename}`;
  const readStream = createReadStream();
  // /* Only Develop mode, will be remove.
  const writeStream: fs.WriteStream = fs.createWriteStream(
    `${process.cwd()}/src/uploads/${
      type === "avatar" ? "avatar" : "shop"
    }/${newFilename}`
  );
  readStream.pipe(writeStream);
  const urlPath = `http://localhost:4000/static/${
    type === "avatar" ? "avatar" : "shop"
  }/${filename}`;
  return urlPath;
};
