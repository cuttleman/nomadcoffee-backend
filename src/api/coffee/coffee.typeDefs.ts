import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: String!
    url: String
    shop: CoffeeShop
  }
  type CoffeeShop {
    id: String!
    name: String!
    latitude: String
    longitude: String
    user: User!
    photos: [CoffeeShopPhoto]
    categories: [Category]
  }
  type Category {
    id: String!
    name: String
    slug: String
    shops: [CoffeeShop]
    totalShops: Int
  }
`;
