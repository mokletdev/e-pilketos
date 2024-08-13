/*
  Warnings:

  - You are about to drop the column `kelas` on the `Candidates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidates` DROP COLUMN `kelas`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `kelas` VARCHAR(191) NULL,
    MODIFY `role` ENUM('ADMIN', 'GURU', 'SISWA', 'MPK', 'OSIS') NOT NULL DEFAULT 'SISWA';
