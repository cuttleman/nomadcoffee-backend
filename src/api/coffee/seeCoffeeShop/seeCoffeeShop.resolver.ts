import e from "express";
import { CoffeeApi, Resolver } from "types";
import client from "../../../client";

export default {
  Query: {
    seeCoffeeShop: async (
      _: any,
      { id }: CoffeeApi.SeeCoffeeShop.Args
    ): Promise<CoffeeApi.SeeCoffeeShop.Return> => {
      try {
        const findShop = await client.coffeeShop.findFirst({
          where: { id },
          include: {
            photos: true,
          },
        });
        const categories = await client.category.findMany({
          where: {
            shops: {
              some: {
                shopId: findShop?.id,
              },
            },
          },
        });

        if (findShop && categories) {
          return {
            result: true,
            shop: { ...findShop, ...(categories && { categories }) },
          };
        } else {
          throw Error("Not found coffee shop");
        }
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
