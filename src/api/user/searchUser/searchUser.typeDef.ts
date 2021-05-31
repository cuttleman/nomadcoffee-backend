import { gql } from "apollo-server";

export default gql`
  type SearchUsers {
    result: Boolean!
    error: String
    searchingByKeyword: [User]
    cursorId: String
    hasNext: Boolean
  }
  type Query {
    searchUsers(keyword: String!, cursorId: String): SearchUsers!
  }
`;
