export interface EmailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface EmailServiceInterface {
  sendEmail(options: EmailOptions): Promise<void>;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  defaultFrom: string;
}
