import React, { MouseEventHandler } from "react";
import { FormButton } from "./Button";
import { Large_Text, Medium_Text } from "./Text";

interface ModalProops {
  isOpen?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export function AddUserModal() {
  return <></>;
}

export const ModalDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="title mb-4">Are you sure you want to do this?</div>
        <div className="flex justify-end space-x-2">
          <FormButton variant="PRIMARY" onClick={() => onClose(true)}>
            Yes
          </FormButton>
          <button
            className="btnNo bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onClose(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export function VoteModal({ children, isOpen, onClose }: ModalProops) {
  return (
    <>
      <section className="pt-0 p-8 max-w-xl mx-auto">
        <div className="my-3">
          <Large_Text variant="BOLD" className="mb-2 text-center">
            Visi
          </Large_Text>
          <Medium_Text variant="REGULAR" className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur
            adipiscing elit. consectetur adipiscing elit.
          </Medium_Text>
        </div>
        <div className="my-3">
          <Large_Text variant="BOLD" className="mb-2 text-center">
            Misi
          </Large_Text>
          <Medium_Text variant="REGULAR" className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur
            adipiscing elit. consectetur adipiscing elit.
          </Medium_Text>
        </div>
        <div className="my-3">
          <Large_Text variant="BOLD" className="mb-2 text-center">
            Motto
          </Large_Text>
          <Medium_Text variant="REGULAR" className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur
            adipiscing elit. consectetur adipiscing elit.
          </Medium_Text>
        </div>
        <div className="my-3">
          <Large_Text variant="BOLD" className="mb-2 text-center">
            Pengalaman
          </Large_Text>
          <Medium_Text variant="REGULAR" className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur
            adipiscing elit. consectetur adipiscing elit.
          </Medium_Text>
        </div>
        <div className="my-3">
          <Large_Text variant="BOLD" className="mb-2 text-center">
            Program Kerja
          </Large_Text>
          <Medium_Text variant="REGULAR" className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur
            adipiscing elit. consectetur adipiscing elit.
          </Medium_Text>
        </div>
        <div className="mb-3 mt-6">
          <Large_Text variant="BOLD" className="mb-2 text-center">
            Video Profil Kandidat
          </Large_Text>
          <iframe
            src="https://www.youtube.com/embed/9xofia597HI?si=wGP5Kb0411AMpg2n"
            title="YouTube video player"
            className="rounded-[15px] w-full h-[320px] mx-auto duration-500 ease-in-out"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
}
