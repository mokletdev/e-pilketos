import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from "react";

interface ButtonProops {
  children: ReactNode;
  variant: "PRIMARY" | "SECONDARY" | "DISABLE" | "BLACK";
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

export const LinkButton = ({
  className,
  variant,
  href,
  target,
  children,
}: LinkButtonProops) => {
  const secondary = variant === "SECONDARY";
  const primary = variant === "PRIMARY";
  const disable = variant === "DISABLE";
  if (secondary) {
    return (
      <Link
        href={`${href}`}
        target={target}
        className={clsx(
          "px-6 py-3 bg-secondary-color border-2 border-secondary-color text-white rounded-full",
          className,
          "transition-all duration-300 ease-in-out",
          "hover:bg-transparent hover:text-primary-color",
        )}
      >
        {children}
      </Link>
    );
  }
  if (primary) {
    return (
      <Link
        href={`${href}`}
        target={target}
        className={clsx(
          "px-6 py-3 bg-primary-color border-2 border-primary-color text-white rounded-full",
          className,
          "transition-all duration-300 ease-in-out",
          "hover:bg-transparent hover:text-primary-color",
        )}
      >
        {children}
      </Link>
    );
  }
  if (disable) {
    return (
      <Link
        href={`${href}`}
        target={target}
        className={clsx(
          "px-6 py-3 bg-dark-6 border-2 border-dark-6 text-white rounded-full",
          className,
        )}
      >
        {children}
      </Link>
    );
  }
};
export const FormButton = ({
  className,
  variant,
  isDisabled,
  onClick,
  type,
  children,
}: FormButtonProps) => {
  const primary = variant === "PRIMARY";
  const secondary = variant === "SECONDARY";
  const disable = variant === "DISABLE";
  const black = variant === "BLACK";

  if (primary) {
    return (
      <button
        onClick={onClick}
        disabled={isDisabled === true}
        type={type}
        className={clsx(
          "px-6 py-3 bg-primary-color border-2 border-primary-color text-white rounded-full",
          className,
          "transition-all duration-300 ease-in-out",
          "hover:bg-transparent hover:text-primary-color",
        )}
      >
        {children}
      </button>
    );
  }
  if (secondary) {
    return (
      <button
        onClick={onClick}
        disabled={isDisabled === true}
        type={type}
        className={clsx(
          "px-6 py-3 bg-transparent border-2 border-primary-color text-primary-color rounded-full",
          className,
          "transition-all duration-300 ease-in-out",
          "hover:bg-primary-color hover:text-white",
        )}
      >
        {children}
      </button>
    );
  }
  if (disable) {
    return (
      <button
        onClick={onClick}
        disabled={isDisabled === true}
        type={type}
        className={clsx(
          "px-6 py-3 bg-dark-6 border-2 border-dark-6 text-white rounded-full",
          className,
          "transition-all duration-300 ease-in-out",
        )}
      >
        {children}
      </button>
    );
  }
  if (black) {
    return (
      <button
        onClick={onClick}
        disabled={isDisabled === true}
        type={type}
        className={clsx(
          "px-6 py-3 bg-transparent border-2 border-black text-black rounded-full",
          "hover:text-white hover:bg-black",
          className,
          "transition-all duration-300 ease-in-out",
        )}
      >
        {children}
      </button>
    );
  }
};
