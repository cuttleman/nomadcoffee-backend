import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String
    password: String!
    location: String
    avatarUrl: String
    githubUsername: String
    isFollowing: Boolean
    isSelf: Boolean
    createAt: String!
    updateAt: String!
  }
`;
