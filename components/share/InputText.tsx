import type { InputHTMLAttributes } from "react";
import { forwardRef, useEffect, useState } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  htmlFor?: string;
  border?: boolean;
  onChange?: (...args: any) => any;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(function Input(
  { label, htmlFor, border, onChange = () => {}, error, className, ...props },
  ref
) {
  const [errorText, setErrorText] = useState(error);
  useEffect(() => {
    setErrorText(error);
  }, [error]);
  return (
    <div className={`${className} flex flex-col w-full rounded-md`}>
      {label && (
        <label className="text-text-color text-title-content font-semibold">
          {label}
        </label>
      )}
      <div>
        <input
          onChange={(e) => {
            onChange(e);
            setErrorText("");
          }}
          ref={ref}
          {...props}
          className={`border w-full rounded-input ${
            border
              ? "border-primary-color cursor-not-allowed text-placeholder-color"
              : "border-placeholder-color text-text-color"
          }  h-[40px] bg-transparent`}
        />
      </div>
      <span className="text-error font-semibold w-full text-xs">
        {errorText || ""}
      </span>
    </div>
  );
});

export default InputText;
