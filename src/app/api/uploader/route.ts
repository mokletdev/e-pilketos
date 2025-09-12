import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: true, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, new Uint8Array(buffer));

    return NextResponse.json({
      error: false,
      message: "File uploaded successfully",
      url: `/uploads/${fileName}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: true, message: err.message }, { status: 500 });
  }
}
