import { User } from ".prisma/client";
import client from "../../../client";

export default {
  Query: {
    allUsers: (): Promise<User[]> => client.user.findMany(),
  },
};
