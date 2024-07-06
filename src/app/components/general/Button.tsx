import { HTMLAttributeAnchorTarget, MouseEventHandler } from "react";

interface ButtonProops {
  children: React.ReactNode;
  variant: "RED" | "DISABLE";
  className?: string;
}

interface LinkButtonProops extends ButtonProops {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
}

interface FormButtonProps extends ButtonProops {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
  isDisabled?: boolean;
}
