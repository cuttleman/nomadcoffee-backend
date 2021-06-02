import { gql } from "apollo-server";

export default gql`
  type SeeCategory {
    result: Boolean!
    error: String
    category: Category
    shops: [CoffeeShop]
  }
  type Query {
    seeCategory(keyword: String!, pageNum: Int!): SeeCategory!
  }
`;
