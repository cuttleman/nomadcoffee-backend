import { gql } from "apollo-server";

export default gql`
  type EditProfile {
    result: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      email: String
      username: String
      name: String
      location: String
      password: String
      avatar: Upload
    ): EditProfile!
  }
`;
