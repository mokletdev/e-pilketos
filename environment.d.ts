declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_SECURE: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      EMAIL_FROM: string;
      APP_ENV: "development" | "staging" | "production";
      [key: string]: string | undefined;
    }
  }
}

export {};
