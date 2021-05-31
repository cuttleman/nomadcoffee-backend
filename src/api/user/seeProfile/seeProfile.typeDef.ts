import { gql } from "apollo-server";

export default gql`
  type Query {
    seeProfile(id: String!): SeeProfile!
  }
  type SeeProfile {
    result: Boolean!
    error: String
    user: User
    seeFollowers(pageNum: Int!): Followers
    seeFollowing(pageNum: Int!): Followers
    totalFollowers: TotalFollowNum
    totalFollowing: TotalFollowNum
  }
  type Followers {
    users: [User]
    totalPageNum: Int
  }
  type TotalFollowNum {
    count: Int
  }
`;
