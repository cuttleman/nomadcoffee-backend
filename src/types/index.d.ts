declare module "types" {
  import { ResolverFn } from "apollo-server";
  import { User } from ".prisma/client";
  import "./environment";

  namespace UserApi {
    type Password = string;
    type Token = string | string[] | undefined;
    type Id = string;
    interface ReturnG {
      result: boolean;
      error?: string;
    }

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
      loggedUser: User | null;
    }
  }
}
