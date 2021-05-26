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
    createAt: String!
    updateAt: String!
  }
  type Query {
    allUsers: [User]!
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
  # Return type of Queries and Mutations
  type CreateAccount {
    ok: Boolean!
    error: String
  }
`;
