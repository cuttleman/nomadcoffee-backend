import fs from "fs";
import client from "../../../client";
import { CoffeeApi, PhotoG, Resolver } from "types";
import { protectedResolver } from "../../user/user.utils";
import { localSave } from "../../api.utils";
import { v4 as uuidv4 } from "uuid";
import { calculateCategory } from "../coffee.utils";

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
          const photoUrls: { url: string }[] = [];
          if (photos) {
            photos.forEach(async (photo: PhotoG, idx: number) => {
              const url = await localSave("shop", loggedUser?.id, photo);
              photoUrls[idx] = { url };
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

          await client.coffeeShop.update({
            where: { id: newCoffeeShop.id },
            data: {
              photos: {
                createMany: {
                  data: photoUrls,
                },
              },
            },
          });

          if (categories) {
            categories.map(async (keyword: string) => {
              const newCategoryId = uuidv4();
              const newShopId = newCoffeeShop.id;
              await calculateCategory(keyword, newShopId, newCategoryId);
            });
          }

          return { result: true };
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },
};
