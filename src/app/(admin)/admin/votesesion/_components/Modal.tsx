"use client";
import { FormButton } from "@/app/components/general/Button";
import {
  SelectField,
  TextArea,
  TextField,
} from "@/app/components/general/Input"; // No need for SelectField here
import { AddModal } from "@/app/components/general/Modal";
import { Medium_Text } from "@/app/components/general/Text";
import { CandidatesPayload } from "@/utils/database/user.query";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  getCandidatesWhereVoteSessionInput,
  VoteSessionWithCandidates,
} from "@/utils/database/voteSession.query";
import { upsertVoteSession } from "@/utils/database/getServerSession";

export default function VoteSessionModal({
  setIsOpenModal,
  data,
  candidats,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: VoteSessionWithCandidates | null;
  candidats?: CandidatesPayload[] | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState(candidats);

  const AddCandidates = () => {
    setCandidates([...candidates, {}]);
  };

  const DeleteCandidates = (index: number) => {
    setCandidates(candidates?.filter((_, i) => i !== index));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement | any>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const toastId = toast.loading("Loading...");
      const formdata: any = new FormData(e.target);

      const result = await upsertVoteSession(data?.id as string, formdata);
      console.log(result);
      console.log(candidats);
      console.log(data?.User_vote?.candidate_id);
      console.log(data);

      if (!result.error) {
        toast.success(result.message, { id: toastId });
        setIsOpenModal(false);
      } else {
        console.log(result);
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      console.log((error as Error).message);
      toast.error((error as Error).message + ", Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AddModal
      type={data ? "Edit Vote Session" : "Add Vote Session"}
      onClose={() => setIsOpenModal(false)}
    >
      <form onSubmit={handleSubmit} className="pb-4">
        <TextField
          variant="Rounded-sm"
          label="Title"
          type="text"
          name="title"
          value={data?.title || ""}
          required
        />
        {/* <TextField
          variant="Rounded-sm"
          label="Nomor Kandidat"
          type="text"
          name="candidates_number"
          value={data?.Vote_session_candidate?.candidates_number.toString()}
          required
        /> */}
        <div className="grid grid-cols-2 gap-x-7">
          <TextField
            variant="Rounded-sm"
            type="datetime-local"
            label="Opened At"
            name="start_time"
            value={data?.openedAt.toISOString().slice(0, 16)}
            required
          />
          <TextField
            variant="Rounded-sm"
            type="datetime-local"
            label="Close At"
            name="end_time"
            value={data?.closeAt.toISOString().slice(0, 16)}
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <SelectField
            name="is_active"
            className="mr-2 w-full"
            label="Is Public"
            options={[
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]}
            value={data?.isPublic.toString()}
          />
        </div>
        <TextField
          variant="Rounded-sm"
          type="number"
          label="Max Vote"
          name="max_vote"
          value={data?.max_vote.toString()}
          required
        />
        <p className="mt-6">Kandidat</p>
        {candidates.map((can, index) => (
          <div key={index}>
            <div className="flex gap-x-3 items-center">
              <div className="w-full">
                <SelectField
                  name="select_candidates"
                  className="w-full"
                  value={data?.Vote_session_candidate?.candidate_id}
                  options={candidats?.map((x, i) => ({
                    label: x.name,
                    value: x.id,
                  }))}
                />
                <TextField
                  variant="Rounded-sm"
                  type="number"
                  className="w-full"
                  label="Nomor Kandidat"
                  name="candidates_number"
                  value={data?.Vote_session_candidate?.candidates_number.toString()}
                  required
                />
              </div>
              <button
                onClick={() => DeleteCandidates(index)}
                type="button"
                className="bg-primary-color group hover:bg-white rounded-full border-2 border-primary-color mt-3 mb-6 hover:border-primary-color p-2 duration-300"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-primary-color "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => AddCandidates()}
          type="button"
          className="bg-primary-color group hover:bg-white rounded-full border-2 border-primary-color mt-3 mb-6 hover:border-primary-color p-2 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="none"
          >
            <path
              className="fill-white group-hover:fill-primary-color"
              d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
            />
          </svg>
        </button>
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
