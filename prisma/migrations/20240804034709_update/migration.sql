/*
  Warnings:

  - You are about to drop the `Pengalaman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pengalaman` DROP FOREIGN KEY `Pengalaman_candidatesId_fkey`;

-- AlterTable
ALTER TABLE `Candidates` ADD COLUMN `pengalaman` JSON NULL;

-- DropTable
DROP TABLE `Pengalaman`;
