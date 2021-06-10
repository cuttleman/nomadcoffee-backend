import { Resolver } from "types";
import client from "../../../client";

export default {
  Query: {
    seeCoffeeShops: async (
      _: any,
      { pageNum }: any,
      { loggedUser }: Resolver.Context
    ) => {
      const TAKE_NUM = 12;
      try {
        const shops = await client.coffeeShop.findMany({
          where: { userId: loggedUser?.id },
          include: {
            photos: true,
            categories: true,
          },
          skip: (pageNum - 1) * TAKE_NUM,
          take: TAKE_NUM,
        });

        return { result: true, shops };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
