-- CreateTable
CREATE TABLE `User_Auth` (
    `id` CHAR(36) NOT NULL,
    `password` VARCHAR(191) NULL,
    `last_login` DATETIME(3) NULL,
    `user_Id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Auth_user_Id_key`(`user_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('SISWA', 'GURU', 'ADMIN') NOT NULL,
    `angkatan` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidates` (
    `id` CHAR(36) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NULL,
    `visi` VARCHAR(191) NOT NULL,
    `misi` VARCHAR(191) NOT NULL,
    `pengalaman` VARCHAR(191) NOT NULL,
    `motto` VARCHAR(191) NOT NULL,
    `progja` VARCHAR(191) NOT NULL,
    `video_profile` VARCHAR(191) NOT NULL,
    `user_Id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Candidates_user_Id_key`(`user_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote_session` (
    `id` CHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `openedAt` DATETIME(3) NOT NULL,
    `closeAt` DATETIME(3) NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    `max_vote` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_vote` (
    `id` CHAR(36) NOT NULL,
    `vote_session_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `user_Id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_vote_vote_session_id_key`(`vote_session_id`),
    UNIQUE INDEX `User_vote_candidate_id_key`(`candidate_id`),
    UNIQUE INDEX `User_vote_user_Id_key`(`user_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote_session_candidate` (
    `id` CHAR(36) NOT NULL,
    `vote_session_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,

    UNIQUE INDEX `Vote_session_candidate_vote_session_id_key`(`vote_session_id`),
    UNIQUE INDEX `Vote_session_candidate_candidate_id_key`(`candidate_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vote_session_access` (
    `id` CHAR(36) NOT NULL,
    `vote_session_id` VARCHAR(191) NOT NULL,
    `user_Id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `vote_session_access_vote_session_id_key`(`vote_session_id`),
    UNIQUE INDEX `vote_session_access_user_Id_key`(`user_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Auth` ADD CONSTRAINT `User_Auth_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidates` ADD CONSTRAINT `Candidates_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_vote` ADD CONSTRAINT `User_vote_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_vote` ADD CONSTRAINT `User_vote_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_vote` ADD CONSTRAINT `User_vote_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_session_candidate` ADD CONSTRAINT `Vote_session_candidate_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vote_session_access` ADD CONSTRAINT `vote_session_access_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vote_session_access` ADD CONSTRAINT `vote_session_access_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;