import { ChangeEvent } from "react";

interface InputAttributesProps {
  type: string;
  placeholder?: string;
  attributes?: string;
}

interface InputProps {
  label: string;
  inputAttributes: InputAttributesProps;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ label, inputAttributes, onChangeHandler }: InputProps) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type={inputAttributes.type}
        onChange={onChangeHandler}
        placeholder={inputAttributes.placeholder}
      />
    </div>
  );
};
