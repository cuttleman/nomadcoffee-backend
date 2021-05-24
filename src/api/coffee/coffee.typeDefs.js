import { gql } from "apollo-server";

export default gql`
  type Coffee {
    id: String!
    title: String!
    owner: User!
    taste: String
    rate: Int
    materials: [String!]
    progress: [String!]
    createAt: String!
    updateAt: String!
  }
  type Query {
    allCoffee: [Coffee]!
  }
  type Mutation {
    createCoffee(
      title: String!
      taste: String
      materials: [String!]
      progress: [String!]
    ): Boolean!
  }
`;
