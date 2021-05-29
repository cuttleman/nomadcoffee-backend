import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { UserApi, Resolver } from "types";

const SECRET_KEY = process.env.SECRET_KEY;

export const passedHashFn = (password: UserApi.Password): Promise<string> =>
  bcrypt.hash(password, 10);

export const generateToken = (id: UserApi.Id) => jwt.sign({ id }, SECRET_KEY);

export const getUser = async (token: UserApi.Token) => {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }
    const result: any = jwt.verify(token, SECRET_KEY);
    if ("id" in result) {
      const user = await client.user.findUnique({
        where: { id: result["id"] },
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver =
  (resolver: any) =>
  (root: any, args: any, context: Resolver.Context, info: any) => {
    // (root, args, context, info)는 서버에서 넣어주는 인자들임 ex> protectedResolver(resolverFn)(root,args,context,info);
    if (!context.loggedUser) {
      return {
        result: false,
        error: "This action is required logIn.",
      };
    }
    return resolver(root, args, context, info);
  };
