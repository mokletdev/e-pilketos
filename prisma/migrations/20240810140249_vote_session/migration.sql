-- AddForeignKey
ALTER TABLE `Vote_session_candidate` ADD CONSTRAINT `Vote_session_candidate_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
