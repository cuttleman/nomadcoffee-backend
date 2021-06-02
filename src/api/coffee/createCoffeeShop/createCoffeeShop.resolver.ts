import fs from "fs";
import client from "../../../client";
import { CoffeeApi, PhotoG, Resolver } from "types";
import { protectedResolver } from "../../user/user.utils";
import { localSave } from "../../api.utils";
import { v4 as uuidv4 } from "uuid";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _: any,
        {
          name,
          latitude,
          longitude,
          categories,
          photos,
        }: CoffeeApi.CreateCoffeeShop.Args,
        { loggedUser }: Resolver.Context
      ): Promise<CoffeeApi.CreateCoffeeShop.Return> => {
        try {
          const photoUrls: string[] = [];
          if (photos) {
            photos.map(async (photo: PhotoG, idx: number) => {
              photoUrls[idx] = await localSave("shop", loggedUser?.id, photo);
            });
          }
          const newCoffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedUser?.id,
                },
              },
            },
          });
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
                            shopId: newCoffeeShop.id,
                            categoryId: existCategory.id,
                          },
                        },
                        create: {
                          shopId: newCoffeeShop.id,
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
                            shopId: newCoffeeShop.id,
                            categoryId: newCategoryId,
                          },
                        },
                        create: {
                          shopId: newCoffeeShop.id,
                        },
                      },
                    },
                  },
                });
              }
            });
          }
          const urlMap = photoUrls.map((url: string) => ({
            url,
            shopId: newCoffeeShop.id,
          }));

          await client.coffeeShopPhoto.createMany({
            data: [...urlMap],
          });

          return { result: true };
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
