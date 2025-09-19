// app/api/export-users/route.ts
import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Ambil semua user dengan hanya field name dan email
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true
      }
    });

    // Buat workbook Excel baru
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Set header kolom
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 40 }
    ];

    // Style untuk header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Tambahkan data users ke worksheet
    users.forEach(user => {
      worksheet.addRow({
        name: user.name,
        email: user.email
      });
    });

    // Generate buffer Excel
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers untuk download file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="users.xlsx"'
      }
    });

  } catch (error) {
    console.error('Error exporting users to Excel:', error);
    return NextResponse.json(
      { error: 'Failed to export users to Excel' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}