import React, { MouseEventHandler } from "react";

interface ModalProops {
  isOpen?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export function AddUserModal() {
  return <div></div>;
}
