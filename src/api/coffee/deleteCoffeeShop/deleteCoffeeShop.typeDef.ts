import { gql } from "apollo-server";

export default gql`
  type DeleteCoffeeShop {
    result: Boolean!
    error: String
  }
  type Mutation {
    deleteCoffeeShop(id: String!): DeleteCoffeeShop!
  }
`;
