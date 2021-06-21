import { gql } from "apollo-server";

export default gql`
  type SeeCoffeeShops {
    result: Boolean!
    error: String
    totalPage: Int
    shops: [CoffeeShop]
  }
  type Query {
    seeCoffeeShops(pageNum: Int!): SeeCoffeeShops!
  }
`;
