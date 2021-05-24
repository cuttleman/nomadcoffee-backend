import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    userName: String!
    email: String!
    firstName: String
    LastName: String
    caption: String
    coffee: [Coffee]!
    createAt: String!
    updateAt: String!
  }
  type Query {
    allUsers: [User]!
  }
  type Mutation {
    createUser(
      email: String!
      userName: String!
      firstName: String
      LastName: String
    ): Boolean!
  }
`;
