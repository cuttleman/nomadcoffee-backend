import { gql } from "apollo-server";

export default gql`
  type SeeProfile {
    result: Boolean!
    user: User
    error: String
  }
  type Query {
    seeProfile(username: String!): SeeProfile!
  }
`;
