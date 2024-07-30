import { useState } from 'react';

export const InputField = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    className,
    error,
    errorMessage,
    ...props
}: Readonly<{
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  [key: string]: any;
}>) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const inputClassName = `mt-1 p-2 border rounded-[10px] py-3 px-3 outline-none transition ease-in-out delay-150 text-input
  ${
    error
        ? '!bg-white border-error'
        : isFocused
            ? '!bg-white border-input'
            : '!bg-input border-input'
}`;

    return (
        <div className={`flex flex-col w-full ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-400">{label}</label>
            )}
            <input
                className={inputClassName}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
            {error && errorMessage && errorMessage.length > 0 && (
                <div className="text-error text-xs mt-2.5 leading-none">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};
