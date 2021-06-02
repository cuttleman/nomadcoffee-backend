import { CoffeeApi } from "types";
import client from "../../client";

export default {
  Category: {
    totalShops: async (
      parent: CoffeeApi.CategoryComputed.Parent
    ): Promise<number> =>
      client.coffeeShopToCategory.count({
        where: { categoryId: parent.id },
      }),
  },
};
