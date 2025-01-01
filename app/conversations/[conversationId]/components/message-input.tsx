"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  type = "text",
  errors,
  required,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 w-full bg-neutral-100 rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
