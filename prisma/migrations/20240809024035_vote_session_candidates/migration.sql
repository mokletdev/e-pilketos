/*
  Warnings:

  - You are about to drop the column `number` on the `Vote_session_candidate` table. All the data in the column will be lost.
  - Added the required column `candidates_number` to the `Vote_session_candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vote_session_candidate` DROP COLUMN `number`,
    ADD COLUMN `candidates_number` INTEGER NOT NULL;
