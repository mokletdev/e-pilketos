"use client";
import { FormButton } from "@/app/components/general/Button";
import { SelectField, TextField } from "@/app/components/general/Input"; // No need for SelectField here
import { AddModal } from "@/app/components/general/Modal";
import { Medium_Text } from "@/app/components/general/Text";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  CandidatesWithVoteSessionCandidates,
  VoteSessionWithCandidates,
} from "@/utils/database/voteSession.query";
import { upsertVoteSession } from "@/utils/database/getServerSession";
import { Candidates } from "@prisma/client";

interface TopikVote {
  id?: string;
  situasi: string;
  pertanyaan: string;
  jawaban: string;
  tanggapan: Array<{
    id?: string;
    pertanyaan: string;
    tanggapan: string;
  }>;
}

interface CandidateWithTopik extends CandidatesWithVoteSessionCandidates {
  topik?: TopikVote[];
}

export default function VoteSessionModal({
  setIsOpenModal,
  data,
  candidats,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: VoteSessionWithCandidates | null;
  candidats?: Candidates[] | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<CandidateWithTopik[]>(
    data?.vote_session_candidate?.map((candidate) => ({
      ...candidate,
      topik: candidate.topik || [],
    })) || [],
  );

  const AddCandidates = () => {
    setCandidates([
      ...candidates,
      {
        candidates_number: 0,
        candidate_id: "",
        topik: [],
      },
    ]);
  };

  const DeleteCandidates = (index: number) => {
    setCandidates(candidates?.filter((_, i) => i !== index));
  };

  const AddTopik = (candidateIndex: number) => {
    const newCandidates = [...candidates];
    if (!newCandidates[candidateIndex].topik) {
      newCandidates[candidateIndex].topik = [];
    }
    newCandidates[candidateIndex].topik!.push({
      situasi: "",
      pertanyaan: "",
      jawaban: "",
      tanggapan: [],
    });
    setCandidates(newCandidates);
  };

  const DeleteTopik = (candidateIndex: number, topikIndex: number) => {
    const newCandidates = [...candidates];
    newCandidates[candidateIndex].topik =
      newCandidates[candidateIndex].topik?.filter((_, i) => i !== topikIndex) ||
      [];
    setCandidates(newCandidates);
  };

  const UpdateTopik = (
    candidateIndex: number,
    topikIndex: number,
    field: keyof TopikVote,
    value: string,
  ) => {
    const newCandidates = [...candidates];
    if (newCandidates[candidateIndex].topik) {
      (newCandidates[candidateIndex].topik![topikIndex] as any)[field] = value;
      setCandidates(newCandidates);
    }
  };

  const AddTanggapan = (candidateIndex: number, topikIndex: number) => {
    const newCandidates = [...candidates];
    if (newCandidates[candidateIndex].topik) {
      newCandidates[candidateIndex].topik![topikIndex].tanggapan.push({
        pertanyaan: "",
        tanggapan: "",
      });
      setCandidates(newCandidates);
    }
  };

  const DeleteTanggapan = (
    candidateIndex: number,
    topikIndex: number,
    tanggapanIndex: number,
  ) => {
    const newCandidates = [...candidates];
    if (newCandidates[candidateIndex].topik) {
      newCandidates[candidateIndex].topik![topikIndex].tanggapan =
        newCandidates[candidateIndex].topik![topikIndex].tanggapan.filter(
          (_, i) => i !== tanggapanIndex,
        );
      setCandidates(newCandidates);
    }
  };

  const UpdateTanggapan = (
    candidateIndex: number,
    topikIndex: number,
    tanggapanIndex: number,
    field: string,
    value: string,
  ) => {
    const newCandidates = [...candidates];
    if (newCandidates[candidateIndex].topik) {
      (
        newCandidates[candidateIndex].topik![topikIndex].tanggapan[
          tanggapanIndex
        ] as any
      )[field] = value;
      setCandidates(newCandidates);
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement | any>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const toastId = toast.loading("Loading...");
      const formdata = new FormData(e.target);

      const result = await upsertVoteSession(data?.id as string, formdata);

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

  const openedAt = data?.openedAt;
  const closedAt = data?.closeAt;
  openedAt?.setMinutes(openedAt.getMinutes() - openedAt.getTimezoneOffset());
  closedAt?.setMinutes(closedAt.getMinutes() - closedAt.getTimezoneOffset());

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
        <div className="grid grid-cols-2 gap-x-7">
          <TextField
            variant="Rounded-sm"
            type="datetime-local"
            label="Opened At"
            name="start_time"
            value={openedAt?.toISOString().slice(0, 16)}
            required
          />
          <TextField
            variant="Rounded-sm"
            type="datetime-local"
            label="Close At"
            name="end_time"
            value={closedAt?.toISOString().slice(0, 16)}
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
        <div className="[&>*]:mt-4">
          <p className="mt-6">Kandidat</p>
          {candidates.map((can, candidateIndex) => (
            <div
              key={can.candidate_id + candidateIndex}
              className="border-separate border border-black px-4 py-3 rounded-md mb-4"
            >
              <div className="flex gap-x-3 items-center">
                <div className="w-full">
                  <SelectField
                    name={`candidate_id`}
                    className="w-full"
                    value={can.candidate_id}
                    options={
                      candidats?.map((x, i) => ({
                        label: x.name,
                        value: x.id,
                      })) || []
                    }
                    required
                  />
                  <TextField
                    variant="Rounded-sm"
                    type="text"
                    className="w-full"
                    label="Nomor Urut Kandidat"
                    name={`candidate_number`}
                    value={can.candidates_number?.toString()}
                    required
                  />
                </div>
                <button
                  onClick={() => DeleteCandidates(candidateIndex)}
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

              {/* Topik Section */}
              <div className="mt-4 pl-4 border-l-2 border-gray-300">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">Topik Kandidat</p>
                  <button
                    onClick={() => AddTopik(candidateIndex)}
                    type="button"
                    className="bg-blue-500 text-white hover:bg-blue-600 rounded px-3 py-1 text-sm duration-150"
                  >
                    + Tambah Topik
                  </button>
                </div>

                {can.topik?.map((topik, topikIndex) => (
                  <div
                    key={topikIndex}
                    className="border border-gray-200 rounded p-3 mb-3 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        Topik {topikIndex + 1}
                      </p>
                      <button
                        onClick={() => DeleteTopik(candidateIndex, topikIndex)}
                        type="button"
                        className="bg-red-500 text-white hover:bg-red-600 rounded p-1 text-xs duration-150"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <textarea
                      name={`topik_${candidateIndex}_${topikIndex}_situasi`}
                      className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                      placeholder="Situasi"
                      value={topik.situasi}
                      onChange={(e) =>
                        UpdateTopik(
                          candidateIndex,
                          topikIndex,
                          "situasi",
                          e.target.value,
                        )
                      }
                      rows={3}
                    />

                    <TextField
                      variant="Rounded-sm"
                      type="text"
                      className="w-full mb-2"
                      label="Pertanyaan"
                      name={`topik_${candidateIndex}_${topikIndex}_pertanyaan`}
                      value={topik.pertanyaan}
                      handleChange={(e) =>
                        UpdateTopik(
                          candidateIndex,
                          topikIndex,
                          "pertanyaan",
                          e.target.value,
                        )
                      }
                    />

                    <TextField
                      variant="Rounded-sm"
                      type="text"
                      className="w-full mb-3"
                      label="Jawaban"
                      name={`topik_${candidateIndex}_${topikIndex}_jawaban`}
                      value={topik.jawaban}
                      handleChange={(e) =>
                        UpdateTopik(
                          candidateIndex,
                          topikIndex,
                          "jawaban",
                          e.target.value,
                        )
                      }
                    />

                    {/* Tanggapan Section */}
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">
                          Tanggapan
                        </p>
                        <button
                          onClick={() =>
                            AddTanggapan(candidateIndex, topikIndex)
                          }
                          type="button"
                          className="bg-green-500 text-white hover:bg-green-600 rounded px-2 py-1 text-xs duration-150"
                        >
                          + Tanggapan
                        </button>
                      </div>

                      {topik.tanggapan.map((tanggapan, tanggapanIndex) => (
                        <div
                          key={tanggapanIndex}
                          className="flex gap-2 mb-2 items-end"
                        >
                          <div className="flex-1">
                            <TextField
                              variant="Rounded-sm"
                              type="text"
                              className="w-full mb-1"
                              label={`Pertanyaan Tanggapan ${
                                tanggapanIndex + 1
                              }`}
                              name={`tanggapan_${candidateIndex}_${topikIndex}_${tanggapanIndex}_pertanyaan`}
                              value={tanggapan.pertanyaan}
                              handleChange={(e) =>
                                UpdateTanggapan(
                                  candidateIndex,
                                  topikIndex,
                                  tanggapanIndex,
                                  "pertanyaan",
                                  e.target.value,
                                )
                              }
                            />
                            <TextField
                              variant="Rounded-sm"
                              type="text"
                              className="w-full"
                              label={`Tanggapan ${tanggapanIndex + 1}`}
                              name={`tanggapan_${candidateIndex}_${topikIndex}_${tanggapanIndex}_tanggapan`}
                              value={tanggapan.tanggapan}
                              handleChange={(e) =>
                                UpdateTanggapan(
                                  candidateIndex,
                                  topikIndex,
                                  tanggapanIndex,
                                  "tanggapan",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <button
                            onClick={() =>
                              DeleteTanggapan(
                                candidateIndex,
                                topikIndex,
                                tanggapanIndex,
                              )
                            }
                            type="button"
                            className="bg-red-500 text-white hover:bg-red-600 rounded p-1 mb-1 duration-150"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => AddCandidates()}
          type="button"
          className="bg-primary-color group text-white hover:text-primary-color hover:bg-white rounded-full border-2 border-primary-color mt-3 mb-6 hover:border-primary-color p-2 duration-150 flex gap-2"
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
          Tambah Kandidat
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
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
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
