import GoogleClient from "./googleClient";
import { drive_v3 } from "googleapis";

export class DriveService {
  private googleClient: GoogleClient;

  constructor(googleClient: GoogleClient = new GoogleClient()) {
    this.googleClient = googleClient;
  }

  async createFile(
    name: string,
    mimeType: string,
    parents?: string[],
    content?: string,
  ): Promise<drive_v3.Schema$File> {
    const drive = await this.googleClient.drive();

    const fileMetadata = {
      name: name,
      mimeType: mimeType,
      parents: parents,
    };

    const media = content
      ? {
          mimeType: mimeType,
          body: Buffer.from(content, "utf8"),
        }
      : undefined;

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name",
    });

    return response.data;
  }
}
