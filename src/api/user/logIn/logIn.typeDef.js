import { gql } from "apollo-server";

export default gql`
  type LogIn {
    result: Boolean!
    token: String
    error: String
  }
  type Mutation {
    logIn(email: String!, password: String!): LogIn!
  }
`;
