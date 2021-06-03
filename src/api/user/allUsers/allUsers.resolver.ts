import { UserApi } from "types";
import client from "../../../client";

export default {
  Query: {
    allUsers: (): Promise<UserApi.User[]> => client.user.findMany(),
  },
};
