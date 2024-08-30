import { google, sheets_v4, drive_v3 } from "googleapis";

export default class GoogleClient {
  private credentials: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
  };
  private auth;
  private scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.readonly",
  ];

  constructor() {
    this.credentials = {
      type: process.env.GOOGLE_CLIENT_TYPE || "",
      project_id: process.env.GOOGLE_PROJECT_ID || "",
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || "",
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
      client_id: process.env.GOOGLE_CLIENT_ID || "",
    };

    this.auth = new google.auth.GoogleAuth({
      credentials: this.credentials,
      scopes: this.scopes,
    });
  }

  sheet(): sheets_v4.Sheets {
    const sheets = google.sheets({ version: "v4", auth: this.auth });
    return sheets;
  }

  drive(): drive_v3.Drive {
    const drive = google.drive({ version: "v3", auth: this.auth });
    return drive;
  }
}
