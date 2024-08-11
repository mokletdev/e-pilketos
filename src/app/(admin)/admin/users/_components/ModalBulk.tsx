"use client";
import { FormButton, LinkButton } from "@/app/components/general/Button";
import { AddModal } from "@/app/components/general/Modal";
import { Medium_Text } from "@/app/components/general/Text";
import { bulkAddUsers } from "@/utils/actions/users.actions";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FaFileExcel } from "react-icons/fa";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: User | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLFormElement | any>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target);
      const toastId = toast.loading("Loading...");
      const update = await bulkAddUsers(formData);
      if (!update.error) {
        toast.success(update.message, { id: toastId });
        setIsLoading(false);
        setIsOpenModal(false);
        router.refresh();
      } else {
        toast.error(update.message, { id: toastId });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.log((error as Error).message);
    }
  };

  return (
    <AddModal type="Tambah User" onClose={() => setIsOpenModal(false)}>
      <form onSubmit={handleSubmit} className="pb-4 flex flex-col gap-4">
        <div className="inline-block relative py-4">
          <label htmlFor="file-input">Upload file</label>
          <input
            type="file"
            name="file"
            id="file-input"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
          />
        </div>
        <div>
          <LinkButton
            href="/template-excel/users.xlsx"
            target="_blank"
            variant="PRIMARY"
          >
            Download Template
          </LinkButton>
        </div>
        <div className="w-full flex gap-x-4">
          <FormButton
            onClick={() => {
              setIsOpenModal(false);
              router.refresh();
            }}
            type="button"
            variant="BLACK"
            className="w-full"
          >
            <Medium_Text variant="BOLD">Close</Medium_Text>
          </FormButton>
          <FormButton
            type="submit"
            variant="PRIMARY"
            className="w-full"
            isDisabled={isLoading}
          >
            <Medium_Text variant="BOLD">
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
                  <p>Loading...</p>
                </div>
              ) : (
                "Submit"
              )}
            </Medium_Text>
          </FormButton>
        </div>
      </form>
    </AddModal>
  );
}

export function AddBulk() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <Modal setIsOpenModal={setShowModal} />}
      <FormButton
        onClick={() => setShowModal(true)}
        variant="PRIMARY"
        className="flex gap-x-3 items-center"
      >
        <FaFileExcel />
        <Medium_Text variant="BOLD">Bulk Create</Medium_Text>
      </FormButton>
    </>
  );
}
