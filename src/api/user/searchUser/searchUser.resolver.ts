import { User } from ".prisma/client";
import { UserApi } from "types";
import client from "../../../client";
import { protectedResolver } from "../user.utils";

export default {
  Query: {
    searchUsers: protectedResolver(
      async (
        _: any,
        { keyword, cursorId: prevCursorId }: UserApi.SearchUsers.Args
      ): Promise<UserApi.SearchUsers.Return> => {
        const TAKE_NUM: number = 10;
        let firstUserId: string = "";
        try {
          if (!prevCursorId) {
            const firstUser: User | null = await client.user.findFirst({
              where: { username: { startsWith: keyword.toLowerCase() } },
            });
            if (!firstUser) {
              throw Error("Not found");
            } else {
              firstUserId = firstUser?.id;
            }
          }

          const searchingByKeyword: User[] | null = await client.user.findMany({
            where: { username: { startsWith: keyword.toLowerCase() } },
            take: TAKE_NUM,
            cursor: {
              id: prevCursorId ? prevCursorId : firstUserId,
            },
            skip: prevCursorId ? 1 : 0,
          });

          const lastUser: User = searchingByKeyword[TAKE_NUM - 1];
          const currCursorId: string = lastUser?.id;
          const hasNext: boolean = currCursorId ? true : false;
          return {
            result: true,
            searchingByKeyword,
            cursorId: currCursorId,
            hasNext,
          };
        } catch (error) {
          return {
            result: false,
            error: error.message,
          };
        }
      }
    ),
  },
};
