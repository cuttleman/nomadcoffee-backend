declare module "types" {
  import { ResolverFn } from "apollo-server";
  import { ReadStream } from "fs-capacitor";
  import "./environment";

  interface ReturnG {
    result: boolean;
    error?: string;
  }
  type PhotoG = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => ReadStream;
  };

  namespace CoffeeApi {
    type CoffeeShopPhoto = {
      id: String;
      url?: String;
    };
    type CoffeeShop = {
      id: string;
      name: string;
      latitude: string | null;
      longitude: string | null;
      userId: string;
      user?: UserApi.User;
      photos?: CoffeeShopPhoto[];
      categories?: Category[];
      createAt: Date;
      updateAt: Date;
    };
    type Category = {
      id: string;
      name: string;
      slug: string;
      createAt: Date;
      updateAt: Date;
    };
    namespace SeeCategory {
      interface Args {
        keyword: string;
        pageNum: number;
      }
      interface Return extends ReturnG {
        category?: Category;
        shops?: CoffeeShop[];
      }
    }
    namespace SearchCoffeeShop {
      interface Args {
        keyword: string;
      }
      interface Return extends ReturnG {
        shops?: CoffeeShop[];
      }
    }
    namespace SeeCoffeeShop {
      interface Args {
        id: string;
      }
      interface Return extends ReturnG {
        shop?: CoffeeShop;
      }
    }
    namespace SeeCoffeeShops {
      interface Args {
        pageNum: number;
      }
      interface Return extends ReturnG {
        hasNext?: boolean;
        shops?: Promise<CoffeeApi.CoffeeShop>[];
      }
    }
    namespace SeeCategories {
      interface Args {
        keyword: string;
        pageNum: number;
      }
      interface Return extends ReturnG {
        categories?: Category[];
      }
    }
    namespace EditCoffeeShop {
      interface Args extends CreateCoffeeShop.Args {
        name?: string;
        id: string;
      }
      interface Return extends ReturnG {}
    }
    namespace CreateCoffeeShop {
      interface Args {
        name: string;
        latitude?: string;
        longitude?: string;
        categories?: string[];
        photos?: PhotoG[];
      }
      interface Return extends ReturnG {}
    }
    namespace DeleteCoffeeShop {
      interface Args {
        id: string;
      }
      interface Return extends ReturnG {}
    }
  }

  namespace UserApi {
    type Password = string;
    type Token = string | string[] | undefined;
    type Id = string;
    type User = {
      id: string;
      username: string;
      email: string;
      name: string | null;
      password: string;
      location: string | null;
      avatarUrl: string | null;
      githubUsername: string | null;
      createAt: Date;
      updateAt: Date;
    };

    // Resolvers of User Api
    namespace SearchUsers {
      interface Args {
        keyword: string;
        cursorId?: string;
      }
      interface Return extends ReturnG {
        searchingByKeyword?: User[];
        cursorId?: String;
        hasNext?: Boolean;
      }
    }
    namespace ToggleFollow {
      interface Args {
        id: string;
      }
      interface Return extends ReturnG {}
    }
    namespace SeeProfile {
      interface Args {
        id: string;
      }
      interface Return extends ReturnG {
        user?: User;
      }
      namespace Computed {
        interface Parent extends User {
          pageNum: number;
          takeNum: number;
        }
        interface Return {
          users?: User[];
          totalPageNum?: number;
        }
      }
    }
    namespace LogIn {
      interface Args {
        email: string;
        password: string;
      }
      interface Return extends ReturnG {
        token?: string;
      }
    }
    namespace EditProfile {
      interface Args {
        email?: string;
        username?: string;
        name?: string;
        location?: string;
        password?: string;
        avatar?: Upload;
      }
      interface Return extends ReturnG {}
    }
    namespace CreateAccount {
      interface Args {
        email: string;
        username: string;
        password: string;
        name?: string;
        location?: string;
      }
      interface Return extends ReturnG {}
    }
  }

  namespace Resolver {
    type ProtectedResolver = ResolverFn;
    interface Context {
      loggedUser: UserApi.User | null;
    }
  }
}
