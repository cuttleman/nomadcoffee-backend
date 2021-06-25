import { CoffeeApi } from "types";
import client from "../../../client";

export default {
  Query: {
    searchCoffeeShop: async (
      _: any,
      { keyword }: CoffeeApi.SearchCoffeeShop.Args
    ): Promise<CoffeeApi.SearchCoffeeShop.Return> => {
      try {
        let shops: CoffeeApi.CoffeeShop[] | [];
        if (keyword.includes("#")) {
          const category = await client.category.findFirst({
            where: { slug: keyword.slice(1) },
            select: { id: true },
          });
          if (category && category !== null) {
            shops = await client.coffeeShop.findMany({
              where: {
                categories: {
                  some: {
                    categoryId: category.id,
                  },
                },
              },
              include: {
                photos: true,
              },
            });
          } else {
            shops = [];
          }
        } else {
          shops = await client.coffeeShop.findMany({
            where: {
              name: {
                startsWith: keyword,
              },
            },
            include: {
              photos: true,
            },
          });
        }
        return { result: true, shops };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
