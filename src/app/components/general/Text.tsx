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

// Body Large Text
export function Large_Text({
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

// Body Medium Text

export function Medium_Text({
  children,
  className,
  variant,
}: Readonly<BodyTextProops>) {
  switch (variant) {
    case "BOLD":
      return (
        <h1
          className={clsx(
            "text-[16px] font-bold leading-[24px]",
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
            "text-[16px] font-semibold leading-[24px]",
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
            "text-[16px] font-medium leading-[24px]",
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
            "text-[16px] font-normal leading-[24px]",
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

// Body Small Text

export function Small_Text({
  children,
  className,
  variant,
}: Readonly<BodyTextProops>) {
  switch (variant) {
    case "BOLD":
      return (
        <h1
          className={clsx(
            "text-[14px] font-bold leading-[22px]",
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
            "text-[14px] font-semibold leading-[22px]",
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
            "text-[14px] font-medium leading-[22px]",
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
            "text-[14px] font-normal leading-[22px]",
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

// Body Extra Small Text

export function ExtraSmall_Text({
  children,
  className,
  variant,
}: Readonly<BodyTextProops>) {
  switch (variant) {
    case "MEDIUM":
      return (
        <h1
          className={clsx(
            "text-[12px] font-medium leading-[20px]",
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
            "text-[12px] font-normal leading-[20px]",
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
