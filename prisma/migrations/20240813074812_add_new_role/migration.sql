-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'GURU', 'SISWA', 'OSIS', 'MPK') NOT NULL DEFAULT 'SISWA';