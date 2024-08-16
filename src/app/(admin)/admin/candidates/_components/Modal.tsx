// components/Modal.tsx
"use client";
import { FormButton } from "@/app/components/general/Button";
import {
  TextArea,
  TextField,
  SelectField,
} from "@/app/components/general/Input"; // Add SelectField
import { AddModal } from "@/app/components/general/Modal";
import { Medium_Text } from "@/app/components/general/Text";
import PlusAddIcon from "@/app/components/Icons/PlusAddIcon";
import XIcon from "@/app/components/Icons/XIcon";
import {
  getAllVoteSession,
  VoteSessionGeneralPayload,
} from "@/utils/database/voteSession.query"; // Adjust the import path as needed
import { CandidatesPayload } from "@/utils/database/user.query";
import { Pengalaman, Vote_session } from "@prisma/client";
import clsx from "clsx";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect, // Add useEffect
  useState,
} from "react";
import toast from "react-hot-toast";
import { updateCandidatesById } from "@/utils/database/getServerSession";
import {
  getCreatePengalamanCandidates,
  getPengalamanCandidates,
} from "@/utils/database/candidates.query";

// Define the type for the vote session

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: CandidatesPayload | null;
}) {
  const [pengalaman, setPengalaman] = useState<getCreatePengalamanCandidates[]>(
    data?.pengalaman ?? [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [voteSessions, setVoteSessions] = useState<VoteSessionGeneralPayload[]>(
    [],
  );

  useEffect(() => {
    async function fetchVoteSessions() {
      const sessions = await getAllVoteSession();
      setVoteSessions(sessions);
    }
    fetchVoteSessions();
  }, []);

  const addPengalaman = () => {
    setPengalaman([...pengalaman, { desc: "" }]);
  };
  const removePengalaman = (index: number) => {
    setPengalaman(pengalaman.filter((_, i) => i !== index));
  };

  const handlePengalamanChange = (index: number, value: string) => {
    const newPengalaman = [...pengalaman];
    newPengalaman[index] = {
      ...newPengalaman[index],
      desc: value,
    };
    setPengalaman([...newPengalaman]);
    console.log(newPengalaman);
  };

  const HandleSubmit = async (
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement | any>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(pengalaman);

    try {
      const formData = new FormData(e.target);
      formData.append("pengalaman", JSON.stringify(pengalaman));
      const toastId = toast.loading("Loading...");
      const update = await updateCandidatesById(data?.id as string, formData);
      if (!update?.error) {
        toast.success(update?.message as string, { id: toastId });
        console.log(update);

        setIsLoading(false);
        setIsOpenModal(false);
      } else {
        toast.error(update?.message as string, { id: toastId });
        console.log(update);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error((error as Error).message + ", Error");
      console.log((error as Error).message);
    }
  };

  return (
    <AddModal type="Tambah Kandidat" onClose={() => setIsOpenModal(false)}>
      <form onSubmit={HandleSubmit} className="pb-4">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-7">
          <div>
            <TextField
              variant="Rounded-sm"
              value={data?.img}
              type="text"
              label="Foto"
              name="img"
              className="rounded-[8px]"
              required
            />
          </div>
          <div>
            <TextField
              value={data?.name}
              variant="Rounded-sm"
              type="text"
              label="Nama"
              name="candidatesName"
              required
            />
            <TextField
              value={data?.kandidat_kelas as string}
              variant="Rounded-sm"
              type="text"
              label="Kelas"
              name="kandidat_kelas"
              required
            />
            <TextField
              value={data?.motto}
              variant="Rounded-sm"
              type="text"
              label="Motto"
              name="motto"
              required
            />
            <TextField
              value={data?.video_profile as string}
              variant="Rounded-sm"
              type="link"
              label="Video Profil"
              name="video_profile"
            />
          </div>
        </div>
        <p className="mb-3">Pengalaman</p>
        {pengalaman.map((peng, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <TextField
              variant="Rounded-sm"
              type="link"
              handleChange={(e) =>
                handlePengalamanChange(index, e.target.value)
              }
              label={`Pengalaman ${index + 1}`}
              className="w-full"
              name="isi_pengalaman"
              value={peng.desc}
            />
            <button
              title="Button"
              type="button"
              className={clsx(
                "px-4 py-1.5 bg-primary-color border-2 mt-7 border-primary-color text-white rounded-[8px] group",
                "transition-all duration-300 ease-in-out",
                "hover:bg-transparent hover:text-primary-color",
              )}
              onClick={() => removePengalaman(index)}
            >
              <XIcon />
            </button>
          </div>
        ))}
        <button
          title="Button"
          className={clsx(
            "px-4 py-1.5 bg-primary-color border-2 border-primary-color text-white rounded-[8px] group",
            "transition-all duration-300 ease-in-out",
            "hover:bg-transparent hover:text-primary-color",
          )}
          type="button"
          onClick={() => addPengalaman()}
        >
          <PlusAddIcon />
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7">
          <TextArea label="Visi" name="visi" value={data?.visi} required />
          <TextArea label="Misi" name="misi" value={data?.misi} required />
        </div>
        <TextArea
          label="Program Kerja"
          name="progja"
          value={data?.progja}
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
            <>
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
            </>
          </FormButton>
        </div>
      </form>
    </AddModal>
  );
}
