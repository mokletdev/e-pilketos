/*
  Warnings:

  - You are about to drop the column `kelas` on the `Candidates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidates` DROP COLUMN `kelas`,
    ADD COLUMN `kandidat_kelas` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `kelas` VARCHAR(191) NULL;
