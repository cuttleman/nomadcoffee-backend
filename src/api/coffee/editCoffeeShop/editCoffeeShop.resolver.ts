import { CoffeeApi, PhotoG, Resolver } from "types";
import client from "../../../client";
import { v4 as uuidv4 } from "uuid";
import { localSave } from "../../api.utils";
import { calculateCategory } from "../coffee.utils";

export default {
  Mutation: {
    editCoffeeShop: async (
      _: any,
      {
        id,
        name,
        latitude,
        longitude,
        photos,
        categories,
      }: CoffeeApi.EditCoffeeShop.Args,
      { loggedUser }: Resolver.Context
    ): Promise<CoffeeApi.EditCoffeeShop.Return> => {
      try {
        const newPhotos: { where: { id: string }; data: { url: string } }[] =
          [];

        if (photos) {
          photos.map(async (photo: PhotoG, idx: number) => {
            const url = await localSave("shop", loggedUser?.id, photo);
            newPhotos[idx] = { where: { id }, data: { url } };
          });
        }

        const disconnectedCategories = await client.category
          .findMany({
            where: {
              shops: {
                some: { shopId: id },
              },
            },
            select: {
              id: true,
            },
          })
          .then((result: any) =>
            result.map((prevCategory: any) => ({
              shopId_categoryId: { shopId: id, categoryId: prevCategory.id },
            }))
          );

        const updateShop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            photos: {
              updateMany: newPhotos,
            },
            categories: {
              delete: disconnectedCategories,
            },
          },
        });

        if (categories) {
          categories.map(async (keyword: string) => {
            const newCategoryId = uuidv4();
            const updateShopId = updateShop.id;
            await calculateCategory(keyword, updateShopId, newCategoryId);
          });
        }

        return { result: true };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
