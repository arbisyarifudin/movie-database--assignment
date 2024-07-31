import React from 'react';

type ButtonProps = {
  label: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  color?: 'primary' | 'error' | 'warning' | 'light';
  size?: 'sm' | 'lg' | 'default';
  [key: string]: any;
};

const colorClasses = {
    light: 'bg-white border-gray-300 text-gray-700',
    primary: 'bg-primary border-primary text-white',
    error: 'bg-red-500 border-red-500 text-white',
    warning: 'bg-yellow-500 border-yellow-500 text-white',
};

const outlineColorClasses = {
    light: 'bg-transparent border border-gray-300 text-gray-100 hover:bg-[rgba(255,255,255,0.1)]',
    primary: 'bg-transparent border border-primary text-primary',
    error: 'bg-transparent border border-red-500 text-red-500',
    warning: 'bg-transparent border border-yellow-500 text-yellow-500',
};

const sizeClasses: { [key: string]: string } = {
    sm: 'min-w-10 min-h-8 py-2 px-4 text-sm',
    default: 'min-w-14 min-h-12 py-3 px-7 text-base',
    lg: 'min-w-18 min-h-16 py-4 px-9 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
    label,
    className = '',
    onClick,
    outline = false,
    color = 'primary',
    size = 'default',
    ...props
}) => {
    const colorClass = outline ? outlineColorClasses[color] : colorClasses[color];
    const sizeClass = sizeClasses[!!size ? size : 'default'];

    return (
        <button
            className={`rounded-[10px] justify-center items-center inline-flex hover:bg-opacity-90 active:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${colorClass} ${sizeClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            <div className="text-center font-bold">{label}</div>
        </button>
    );
};
