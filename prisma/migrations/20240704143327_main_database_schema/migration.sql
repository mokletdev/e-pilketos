-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('SISWA', 'GURU', 'ADMIN') NOT NULL,
    `angkatan` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NULL,
    `visi` VARCHAR(191) NOT NULL,
    `misi` VARCHAR(191) NOT NULL,
    `pengalaman` VARCHAR(191) NOT NULL,
    `motto` VARCHAR(191) NOT NULL,
    `progja` VARCHAR(191) NOT NULL,
    `video_profile` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Candidates_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidates` ADD CONSTRAINT `Candidates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
