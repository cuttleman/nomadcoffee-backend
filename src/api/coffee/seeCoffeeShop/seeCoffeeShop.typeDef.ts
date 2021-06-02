import { gql } from "apollo-server";

export default gql`
  type SeeCoffeeShop {
    result: Boolean!
    error: String
    shop: CoffeeShop
  }
  type Query {
    seeCoffeeShop(id: String!): SeeCoffeeShop!
  }
`;
