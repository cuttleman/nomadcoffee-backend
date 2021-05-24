import client from "../../client";

export default {
  Query: {
    allUsers: () => client.user.findMany(),
  },
};
