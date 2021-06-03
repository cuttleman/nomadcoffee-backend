import { CoffeeApi } from "types";
import client from "../../client";

export default {
  Category: {
    totalShops: async (parent: CoffeeApi.Category): Promise<number> => {
      const count = await client.coffeeShopToCategory.count({
        where: { categoryId: parent.id },
      });
      if (count === 0) {
        await client.category.delete({
          where: { id: parent.id },
        });
      }
      return count;
    },
  },
};
