import { gql } from "apollo-server";

export default gql`
  type EditCoffeeShop {
    result: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: String!
      name: String
      latitude: String
      longitude: String
      photos: [Upload]
      categories: [String]
    ): EditCoffeeShop!
  }
`;
