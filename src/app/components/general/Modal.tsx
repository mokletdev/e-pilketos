import React, { FormEvent, MouseEventHandler } from "react";
import { FormButton } from "./Button";
import { H2, Large_Text, Medium_Text } from "./Text";
import clsx from "clsx";

interface ModalProops {
  isOpen?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

export function AddUserModal() {
  return <></>;
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
