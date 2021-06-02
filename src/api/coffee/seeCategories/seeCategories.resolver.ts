import { CoffeeApi, Resolver } from "types";
import client from "../../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Query: {
    seeCategories: protectedResolver(
      async (
        _: any,
        { keyword, pageNum }: CoffeeApi.SeeCategories.Args
      ): Promise<CoffeeApi.SeeCategories.Return> => {
        try {
          const TAKE_NUM = 5;
          const categories = await client.category.findMany({
            where: { name: { startsWith: keyword } },
            skip: (pageNum - 1) * TAKE_NUM,
            take: TAKE_NUM,
          });
          return { result: true, categories };
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
