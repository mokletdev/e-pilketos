import { sheets_v4 } from "googleapis";
import GoogleClient from "./googleClient";

export class SheetsService {
  private googleClient: GoogleClient;
  public sheet: sheets_v4.Sheets;

  constructor(googleClient: GoogleClient = new GoogleClient()) {
    this.googleClient = googleClient;
    this.sheet = this.googleClient.sheet();
  }

  async updateSheet(
    spreadsheetId: string,
    range: string,
    values: any[][],
  ): Promise<void> {
    const sheets = this.sheet;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });
  }

  async clearSheet(spreadsheetId: string, range: string): Promise<void> {
    const sheets = this.sheet;

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });
  }

  async createPage(spreadsheetId: string, title: string) {
    const sheets = this.sheet;

    return await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title } } }],
      },
    });
  }

  async readSheet(spreadsheetId: string, range: string): Promise<any[][]> {
    const sheets = this.sheet;

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return result.data.values || [];
  }

  async getSheetIdByName(
    spreadsheetId: string,
    sheetName: string,
  ): Promise<number | null> {
    try {
      const spreadsheet = await this.sheet.spreadsheets.get({
        spreadsheetId,
      });

      const sheet = spreadsheet.data.sheets?.find(
        (s) => s.properties?.title === sheetName,
      );

      if (sheet && sheet.properties?.sheetId !== undefined) {
        return sheet.properties.sheetId;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching sheet ID:", error);
      throw new Error("Failed to retrieve sheet ID");
    }
  }

  async appendToSheet(
    spreadsheetId: string,
    range: string,
    values: any[][],
  ): Promise<void> {
    const sheets = this.sheet;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });
  }

  async createSheetHeader(spreadsheetId: string, sheetId: number) {
    await this.sheet.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startColumnIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  horizontalAlignment: "CENTER",
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields: "userEnteredFormat(textFormat,horizontalAlignment)",
            },
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId,
                gridProperties: {
                  frozenRowCount: 1,
                },
              },
              fields: "gridProperties.frozenRowCount",
            },
          },
        ],
      },
    });
  }
}
