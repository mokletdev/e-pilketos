"use client";
import clsx from "clsx";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  name?: string;
  value?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

interface TextFieldProps extends InputProps {
  type: "email" | "text" | "password" | "number" | string;
}

export function TextField({
  label,
  placeholder,
  className,
  name,
  required,
  type,
  handleChange,
  value,
  onKeyDown,
  disabled,
}: Readonly<TextFieldProps>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={clsx("flex flex-col my-6 gap-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            `first-letter:capitalize ${
              required ? "after:text-red-500 after:content-['*']" : ""
            }`,
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type == "password" && (
          <button
            className="absolute right-3 mt-4 flex items-center px-2 text-neutral-400 hover:text-neutral-500 transition-all"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
        <input
          type={showPassword ? "text" : type}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={handleChange}
          id={name}
          className="w-full rounded-full bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3"
          required={required}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
