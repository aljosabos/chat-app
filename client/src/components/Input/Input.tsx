import type { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface IInputProps<TData extends FieldValues> {
  name: Path<TData>;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  register: UseFormRegister<TData>;
  error?: string;
}

export const Input = <TData extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  error,
}: IInputProps<TData>) => {
  return (
    <div className="mt-8 content-center dark:text-dark-text-1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        {...register(name)}
        type={type ?? "text"}
        placeholder={placeholder}
        className="w-full dark:bg-dark-bg-3 text-base py-2 px-4 rounded-lg outline-none"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
