import { gql } from "apollo-server";

export default gql`
  type CreateAccount {
    result: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      email: String!
      username: String!
      password: String!
      name: String
      location: String
    ): CreateAccount!
  }
`;
