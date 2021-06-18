import { CoffeeApi, Resolver } from "types";
import client from "../../../client";
import { protectedResolver } from "../../api.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(
      async (
        _: any,
        { id }: CoffeeApi.DeleteCoffeeShop.Args,
        { loggedUser }: Resolver.Context
      ): Promise<CoffeeApi.DeleteCoffeeShop.Return> => {
        try {
          await client.$queryRaw` DELETE FROM "CoffeeShop" WHERE "id"=${id} AND "userId"=${loggedUser?.id};`;
          return { result: true };
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
