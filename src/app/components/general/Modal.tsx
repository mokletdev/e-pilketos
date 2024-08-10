import React, { FormEvent, MouseEventHandler, ReactNode } from "react";
import { FormButton } from "./Button";
import { H2, H6, Large_Text, Medium_Text } from "./Text";
import clsx from "clsx";

interface ModalProops {
  isOpen?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

export function AddModal({
  onClose,
  children,
  type,
}: {
  onClose: () => void;
  children: ReactNode;
  type: string;
}) {
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 min-h-screen max-h-full bg-black/50">
      <div className="relative p-4 w-full max-w-4xl mt-10 mb-36 mx-auto max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <H6>{type}</H6>
            <button
              onClick={() => onClose()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide="static-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export const ModalDialog = ({
  isOpen,
  onClose,
  handleSubmit,
}: {
  isOpen: any;
  onClose: MouseEventHandler<HTMLButtonElement> | boolean | any;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white rounded-2xl p-4 shadow-lg py-[92px] px-[88px] max-w-[1050px]">
        <div className="mb-[52px]">
          <H2 className="text-center mb-[18px]">
            Apakah pilihanmu sudah benar?
          </H2>
          <Large_Text
            variant="REGULAR"
            className="text-center text-secondary-text-color"
          >
            Jika pilihan sudah benar bisa langsung klik komfirmasi, jika belum
            yakin bisa klik batal untuk mengecek pilihan lagi
          </Large_Text>
        </div>
        <div className="flex justify-center w-full space-x-2">
          <FormButton
            className="w-full"
            variant="BLACK"
            onClick={() => onClose(true)}
          >
            <Medium_Text variant="BOLD">Batal</Medium_Text>
          </FormButton>
          <FormButton
            className="w-full"
            variant="PRIMARY"
            onClick={handleSubmit}
          >
            <Medium_Text variant="BOLD">Konfirmasi</Medium_Text>
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export function VoteModal({ children, className }: Readonly<ModalProops>) {
  return (
    <section className="relative w-10/12 h-full pb-12 mx-auto">
      <section className={clsx("bg-white pt-0 w-auto ", className)}>
        {children}
      </section>
    </section>
  );
}
