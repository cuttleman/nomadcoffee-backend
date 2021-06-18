import client from "../../../client";
import { protectedResolver } from "../../api.utils";
import { Resolver, UserApi } from "types";

export default {
  Query: {
    seeProfile: protectedResolver(
      async (
        _: any,
        { id }: UserApi.SeeProfile.Args,
        { loggedUser }: Resolver.Context
      ) => {
        let user: any = null;
        try {
          if (id) {
            user = await client.user.findUnique({
              where: { id },
            });
          } else {
            user = loggedUser;
          }
          if (user) {
            const TAKE_NUM: number = 5;

            return {
              result: true,
              user,
              seeFollowers: ({ pageNum }: any) => ({
                ...user,
                pageNum,
                takeNum: TAKE_NUM,
              }),
              seeFollowing: ({ pageNum }: any) => ({
                ...user,
                pageNum,
                takeNum: TAKE_NUM,
              }),
              totalFollowers: { ...user },
              totalFollowing: { ...user },
            };
          } else {
            throw Error("Not Found specific User from username");
          }
        } catch (error) {
          return { result: false, error: error.message };
        }
      }
    ),
  },

  // Resolver Chain : 'https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains'
  Followers: {
    // Computed followers, following total page
    totalPageNum: async (
      parent: UserApi.SeeProfile.Computed.Parent,
      _: any,
      __: any,
      info: any
    ) => {
      const { id, takeNum } = parent;
      const { key: from } = info.path.prev;
      const totalNum: number = await client.user.count({
        where: {
          [from === "seeFollowers" ? "following" : "followers"]: {
            some: { id },
          },
        },
      });
      const totalPageNum = Math.ceil(totalNum / takeNum);
      return totalPageNum;
    },
    // Computed followers, following users
    users: async (
      parent: UserApi.SeeProfile.Computed.Parent,
      _: any,
      __: any,
      info: any
    ) => {
      const { id, pageNum, takeNum } = parent;
      const { key: from } = info.path.prev;
      try {
        const followUsers = await client.user.findMany({
          where: {
            [from === "seeFollowers" ? "following" : "followers"]: {
              some: { id },
            },
          },
          skip: (pageNum - 1) * takeNum,
          take: takeNum,
        });

        return followUsers;
      } catch (error) {
        throw Error("Error: seeFollowers resolver in User computed field");
      }
    },
  },

  // Computed followers, following total number
  TotalFollowNum: {
    count: async (
      parent: UserApi.SeeProfile.Computed.Parent,
      _: any,
      __: any,
      info: any
    ): Promise<number> => {
      const { id } = parent;
      const { key: from } = info.path.prev;
      return client.user.count({
        where: {
          [from === "totalFollowers" ? "following" : "followers"]: {
            some: { id },
          },
        },
      });
    },
  },
};
