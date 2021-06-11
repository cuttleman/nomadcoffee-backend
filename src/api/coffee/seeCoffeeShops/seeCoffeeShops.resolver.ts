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
        const findShops = await client.coffeeShop.findMany({
          where: { userId: loggedUser?.id },
          include: {
            photos: true,
          },
          skip: (pageNum - 1) * TAKE_NUM,
          take: TAKE_NUM,
        });

        const shops = findShops.map(async (shop) => {
          const categories = await client.category.findMany({
            where: { shops: { some: { shopId: shop.id } } },
          });
          return { ...shop, ...(categories && { categories }) };
        });
        return { result: true, shops };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
