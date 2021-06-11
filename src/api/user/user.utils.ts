import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { UserApi } from "types";

export const passedHashFn = (password: UserApi.Password): Promise<string> =>
  bcrypt.hash(password, 10);

export const generateToken = (id: UserApi.Id) => {
  if (process.env.SECRET_KEY) {
    return jwt.sign({ id }, process.env.SECRET_KEY);
  } else {
    throw Error("We dont have property as SECRET_KEY in env");
  }
};

export const getUser = async (token: UserApi.Token) => {
  try {
    if (!token) {
      throw Error("getUser action to need token");
    } else if (typeof token !== "string") {
      throw Error("Token type is wrong");
    } else if (!process.env.SECRET_KEY) {
      throw Error("Please, check on environment secret key");
    }

    const result: any = jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in result) {
      const user = await client.user.findUnique({
        where: { id: result["id"] },
      });
      if (user) {
        return user;
      } else {
        throw Error("Not existed user");
      }
    } else {
      throw Error("Error of token decode");
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
