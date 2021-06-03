import client from "../../../client";
import { protectedResolver } from "../user.utils";
import { UserApi } from "types";

export default {
  Query: {
    searchUsers: protectedResolver(
      async (
        _: any,
        { keyword, cursorId: prevCursorId }: UserApi.SearchUsers.Args
      ): Promise<UserApi.SearchUsers.Return> => {
        const TAKE_NUM = 10;
        let firstUserId = "";
        try {
          if (!prevCursorId) {
            const firstUser = await client.user.findFirst({
              where: { username: { startsWith: keyword.toLowerCase() } },
            });
            if (!firstUser) {
              throw Error("Not found");
            } else {
              firstUserId = firstUser?.id;
            }
          }

          const searchingByKeyword = await client.user.findMany({
            where: { username: { startsWith: keyword.toLowerCase() } },
            take: TAKE_NUM,
            cursor: {
              id: prevCursorId ? prevCursorId : firstUserId,
            },
            skip: prevCursorId ? 1 : 0,
          });

          const lastUser = searchingByKeyword[TAKE_NUM - 1];
          const currCursorId = lastUser?.id;
          const hasNext = currCursorId ? true : false;
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
