import client from "../../client";

export default {
  Query: {
    allCoffee: () => client.coffee.findMany(),
  },
};
