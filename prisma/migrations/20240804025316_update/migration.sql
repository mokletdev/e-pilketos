/*
  Warnings:

  - You are about to drop the column `user_Id` on the `Candidates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Candidates` DROP FOREIGN KEY `Candidates_user_Id_fkey`;

-- AlterTable
ALTER TABLE `Candidates` DROP COLUMN `user_Id`,
    ADD COLUMN `userId` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `Candidates` ADD CONSTRAINT `Candidates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
