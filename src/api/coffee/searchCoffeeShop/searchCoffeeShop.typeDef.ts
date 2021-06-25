import { gql } from "apollo-server";

export default gql`
  type SearchCoffeeShop {
    result: Boolean!
    error: String
    shops: [CoffeeShop]
  }
  type Query {
    searchCoffeeShop(keyword: String!): SearchCoffeeShop!
  }
`;
