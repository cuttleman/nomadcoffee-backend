import { CoffeeApi } from "types";
import client from "../../../client";

export default {
  Query: {
    seeCoffeeShops: async (
      _: any,
      { pageNum }: CoffeeApi.SeeCoffeeShops.Args
    ): Promise<CoffeeApi.SeeCoffeeShops.Return> => {
      const TAKE_NUM = 3;

      try {
        const totalShops = await client.coffeeShop.count();
        const totalPage = Math.ceil(totalShops / TAKE_NUM);
        const hasNext = pageNum < totalPage;

        const findShops = await client.coffeeShop.findMany({
          include: {
            photos: true,
            user: true,
          },
          skip: (pageNum - 1) * TAKE_NUM,
          take: TAKE_NUM,
        });

        const shops = findShops.map(
          async (shop: any): Promise<CoffeeApi.CoffeeShop> => {
            const categories = await client.category.findMany({
              where: { shops: { some: { shopId: shop.id } } },
            });
            return { ...shop, ...(categories && { categories }) };
          }
        );
        return { result: true, shops, hasNext };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
