import { gql } from "apollo-server";

export default gql`
  type SeeCoffeeShops {
    result: Boolean!
    error: String
    shops: [CoffeeShop]
  }
  type Query {
    seeCoffeeShops(pageNum: Int!): SeeCoffeeShops!
  }
`;
