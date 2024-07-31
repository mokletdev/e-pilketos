/*
  Warnings:

  - You are about to drop the column `pengalaman` on the `Candidates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidates` DROP COLUMN `pengalaman`;

-- CreateTable
CREATE TABLE `Pengalaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(191) NOT NULL,
    `candidatesId` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengalaman` ADD CONSTRAINT `Pengalaman_candidatesId_fkey` FOREIGN KEY (`candidatesId`) REFERENCES `Candidates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
