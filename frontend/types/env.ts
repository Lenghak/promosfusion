declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_API_ENDPOINT: string;
    NEXT_PUBLIC_URL: string;
  }
}
