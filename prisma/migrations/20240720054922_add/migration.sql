/*
  Warnings:

  - You are about to drop the column `angkatan` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `angkatan`,
    ADD COLUMN `user_pic` VARCHAR(191) NULL;
