import client from "../../client";

export default {
  Mutation: {
    createUser: (_, { email, userName, firstName, LastName }) => {
      // Do something
      return false;
    },
  },
};
