declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      PORT: number;
      PRODUCTION: boolean;
    }
  }
}

export default {};
