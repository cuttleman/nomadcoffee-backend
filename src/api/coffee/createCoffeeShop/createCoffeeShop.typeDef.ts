import { gql } from "apollo-server";

export default gql`
  type CreateCoffeeShop {
    result: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      categories: [String]
      photos: [Upload]
    ): CreateCoffeeShop!
  }
`;
