import { cn } from "@utils/cn";
import type { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface IInputProps<TData extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<TData>;
  type?: HTMLInputElement["type"];
  placeholder?: string;
  register?: UseFormRegister<TData>;
  error?: string;
  className?: string;
  placeholderClasses?: string;
  label?: string;
}

export const Input = <TData extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  error,
  className,
  label,
  ...props
}: IInputProps<TData>) => {
  return (
    <div className="content-center dark:text-dark-text-1 space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-bold tracking-wide">
          {label}
        </label>
      )}

      <input
        {...(register ? register(name) : {})}
        type={type ?? "text"}
        placeholder={placeholder}
        className={cn(
          "w-full text-base py-2 px-4 rounded-lg outline-none border border-gray-300 dark:border-dark-border-2 placeholder:text-dark-text-4 text-dark-text-2",
          className
        )}
        autoComplete="off"
        size={placeholder?.length}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
