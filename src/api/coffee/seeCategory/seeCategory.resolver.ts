import { CoffeeApi } from "types";
import client from "../../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Query: {
    seeCategory: protectedResolver(
      async (
        _: any,
        { keyword, pageNum }: CoffeeApi.SeeCategory.Args
      ): Promise<CoffeeApi.SeeCategory.Return> => {
        try {
          const TAKE_NUM = 10;
          const category = await client.category.findFirst({
            where: { name: keyword },
          });
          if (category) {
            const relations = await client.coffeeShopToCategory.findMany({
              where: { categoryId: category?.id },
            });
            const shopIdMap = relations.map((relation: any) => ({
              id: relation.shopId,
            }));
            const shops = await client.coffeeShop.findMany({
              where: { OR: shopIdMap },
              skip: (pageNum - 1) * TAKE_NUM,
              take: TAKE_NUM,
            });
            return { result: true, category, shops };
          } else {
            throw Error("Can't found a category with keyword");
          }
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
