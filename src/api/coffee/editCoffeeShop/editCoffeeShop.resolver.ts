import { CoffeeApi, PhotoG, Resolver } from "types";
import client from "../../../client";
import { v4 as uuidv4 } from "uuid";
import { localSave } from "../../api.utils";

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
        const photoUrls: string[] = [];
        if (photos) {
          photos.map(async (photo: PhotoG, idx: number) => {
            photoUrls[idx] = await localSave("shop", loggedUser?.id, photo);
          });
        }
        const urlMap = photoUrls.map((url: string) => ({
          where: { id },
          data: { url },
        }));
        const updateShop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            photos: {
              updateMany: urlMap,
            },
          },
        });
        const prevCategory = await client.category.findMany({
          where: {
            shops: {
              some: { shopId: id },
            },
          },
        });
        prevCategory.map(async (category) =>
          client.coffeeShopToCategory.delete({
            where: {
              shopId_categoryId: { shopId: id, categoryId: category.id },
            },
          })
        );

        if (categories) {
          categories.map(async (category: string) => {
            const existCategory = await client.category.findFirst({
              where: { name: category },
            });
            if (existCategory) {
              await client.category.update({
                where: {
                  id: existCategory.id,
                },
                data: {
                  shops: {
                    connectOrCreate: {
                      where: {
                        shopId_categoryId: {
                          shopId: updateShop.id,
                          categoryId: existCategory.id,
                        },
                      },
                      create: {
                        shopId: updateShop.id,
                      },
                    },
                  },
                },
              });
            } else {
              const newCategoryId = uuidv4();
              await client.category.create({
                data: {
                  id: newCategoryId,
                  name: category,
                  slug: category,
                  shops: {
                    connectOrCreate: {
                      where: {
                        shopId_categoryId: {
                          shopId: updateShop.id,
                          categoryId: newCategoryId,
                        },
                      },
                      create: {
                        shopId: updateShop.id,
                      },
                    },
                  },
                },
              });
            }
          });
        }

        return { result: true };
      } catch (error) {
        return { result: false, error: error.message };
      }
    },
  },
};
