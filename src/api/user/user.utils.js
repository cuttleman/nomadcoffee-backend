import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export const passedHashFn = (password) => {
  return bcrypt.hash(password, 10);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.SECRET_KEY);

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver = (resolver) => (root, args, context, info) => {
  // (root, args, context, info)는 서버에서 넣어주는 인자들임 ex> protectedResolver(resolverFn)(root,args,context,info);
  if (!context.loggedUser) {
    return {
      result: false,
      error: "This action is required logIn.",
    };
  }
  return resolver(root, args, context, info);
};
