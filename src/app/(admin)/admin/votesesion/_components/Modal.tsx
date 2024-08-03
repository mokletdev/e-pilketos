"use client";
import { FormButton } from "@/app/components/general/Button";
import { TextArea, TextField } from "@/app/components/general/Input"; // No need for SelectField here
import { AddModal } from "@/app/components/general/Modal";
import { Medium_Text } from "@/app/components/general/Text";
import { CandidatesPayload } from "@/utils/database/user.query";
import clsx from "clsx";
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { upsertVoteSession } from "@/utils/database/voteSession.query"; // Adjust the import path as needed

type VoteSessionPayload = {
  id?: string; // Optional for new sessions
  title: string;
  openedAt: Date;
  closeAt: Date;
  isPublic: boolean;
  maxVote: number;
};

export default function VoteSessionModal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: VoteSessionPayload | null; // Accept existing session data
}) {
  const [title, setTitle] = useState(data?.title || "");
  const [openedAt, setOpenedAt] = useState(data?.openedAt || new Date());
  const [closeAt, setCloseAt] = useState(data?.closeAt || new Date());
  const [isPublic, setIsPublic] = useState(data?.isPublic || false);
  const [maxVote, setMaxVote] = useState(data?.maxVote || 1);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const toastId = toast.loading("Loading...");
      const voteSessionData = {
        id: data?.id, // Pass the ID for updates
        title,
        openedAt: openedAt.toISOString(),
        closeAt: closeAt.toISOString(),
        isPublic,
        maxVote,
      };
      const result = await upsertVoteSession(voteSessionData);
      
      if (!result.error) {
        toast.success(result.message, { id: toastId });
        setIsOpenModal(false); // Close modal on success
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error((error as Error).message + ", Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AddModal type={data ? "Edit Vote Session" : "Add Vote Session"} onClose={() => setIsOpenModal(false)}>
      <form onSubmit={handleSubmit} className="pb-4">
        <TextField
          variant="Rounded-sm"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-x-7">
          <TextField
            variant="Rounded-sm"
            type="datetime-local"
            label="Opened At"
            value={openedAt.toISOString().slice(0, 16)} // Format for input
            onChange={(e) => setOpenedAt(new Date(e.target.value))}
            required
          />
          <TextField
            variant="Rounded-sm"
            type="datetime-local"
            label="Close At"
            value={closeAt.toISOString().slice(0, 16)} // Format for input
            onChange={(e) => setCloseAt(new Date(e.target.value))}
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">Is Public</label>
        </div>
        <TextField
          variant="Rounded-sm"
          type="number"
          label="Max Vote"
          value={maxVote}
          onChange={(e) => setMaxVote(Number(e.target.value))}
          required
        />
        <div className="w-full flex gap-x-4">
          <FormButton
            onClick={() => setIsOpenModal(false)}
            type="button"
            variant="BLACK"
            className="w-full"
          >
            <Medium_Text variant="BOLD">Close</Medium_Text>
          </FormButton>
          <FormButton type="submit" variant="PRIMARY" className="w-full">
            {isLoading ? (
              <div className="flex items-center gap-x-3 justify-center">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 animate-spin text-red-500 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <Medium_Text variant="BOLD">Loading...</Medium_Text>
              </div>
            ) : (
              <Medium_Text variant="BOLD">Submit</Medium_Text>
            )}
          </FormButton>
        </div>
      </form>
    </AddModal>
  );
}
