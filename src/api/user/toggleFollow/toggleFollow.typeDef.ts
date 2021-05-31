import { gql } from "apollo-server";

export default gql`
  type ToggleFollow {
    result: Boolean!
    error: String
  }
  type Mutation {
    toggleFollow(id: String!): ToggleFollow!
  }
`;
