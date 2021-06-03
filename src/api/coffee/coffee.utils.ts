import client from "../../client";

const slugGenerator = (title: string): string => {
  const regexValidator = /[\s]+/g;
  return title.replace(regexValidator, "-");
};

export const calculateCategory = async (
  keyword: string,
  shopId: string,
  newCategoryId: string
): Promise<void> => {
  const existCategory = await client.category.findFirst({
    where: { name: keyword },
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
                shopId,
                categoryId: existCategory.id,
              },
            },
            create: {
              shopId,
            },
          },
        },
      },
    });
  } else {
    await client.category.create({
      data: {
        id: newCategoryId,
        name: keyword,
        slug: slugGenerator(keyword),
        shops: {
          connectOrCreate: {
            where: {
              shopId_categoryId: {
                shopId,
                categoryId: newCategoryId,
              },
            },
            create: {
              shopId,
            },
          },
        },
      },
    });
  }
};
