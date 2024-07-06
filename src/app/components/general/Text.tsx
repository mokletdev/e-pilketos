import clsx from "clsx";
import React from "react";

interface TextProops {
  children?: string;
  className?: string;
}

export function H1({ children, className }: Readonly<TextProops>) {
  return (
    <h1 className={clsx("text-[60px] font-bold leading-[72px]", className)}>
      {children}
    </h1>
  );
}
export function H2({ children, className }: Readonly<TextProops>) {
  return (
    <h1 className={clsx("text-[48px] font-bold leading-[58px]", className)}>
      {children}
    </h1>
  );
}
export function H3({ children, className }: Readonly<TextProops>) {
  return (
    <h1 className={clsx("text-[40px] font-bold leading-[48px]", className)}>
      {children}
    </h1>
  );
}
export function H4({ children, className }: Readonly<TextProops>) {
  return (
    <h1 className={clsx("text-[30px] font-bold leading-[38px]", className)}>
      {children}
    </h1>
  );
}
export function H5({ children, className }: Readonly<TextProops>) {
  return (
    <h1 className={clsx("text-[28px] font-semibold leading-[40px]", className)}>
      {children}
    </h1>
  );
}
export function H6({ children, className }: Readonly<TextProops>) {
  return (
    <h1 className={clsx("text-[24px] font-semibold leading-[30px]", className)}>
      {children}
    </h1>
  );
}

interface BodyTextProops extends TextProops {
  variant: "REGULAR" | "MEDIUM" | "SEMIBOLD" | "BOLD";
}

export function P_Large({
  children,
  className,
  variant,
}: Readonly<BodyTextProops>) {
  switch (variant) {
    case "BOLD":
      return (
        <h1
          className={clsx(
            "text-[18px] font-bold leading-[26px]",
            className,
            variant,
          )}
        >
          {children}
        </h1>
      );
    case "SEMIBOLD":
      return (
        <h1
          className={clsx(
            "text-[18px] font-semibold leading-[26px]",
            className,
            variant,
          )}
        >
          {children}
        </h1>
      );
    case "MEDIUM":
      return (
        <h1
          className={clsx(
            "text-[18px] font-medium leading-[26px]",
            className,
            variant,
          )}
        >
          {children}
        </h1>
      );
    case "REGULAR":
      return (
        <h1
          className={clsx(
            "text-[18px] font-normal leading-[26px]",
            className,
            variant,
          )}
        >
          {children}
        </h1>
      );
    default:
      return <></>;
  }
}
