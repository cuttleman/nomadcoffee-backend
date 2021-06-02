import { gql } from "apollo-server";

export default gql`
  type SeeCategories {
    result: Boolean!
    error: String
    categories: [Category]
  }
  type Query {
    seeCategories(keyword: String!, pageNum: Int!): SeeCategories!
  }
`;
