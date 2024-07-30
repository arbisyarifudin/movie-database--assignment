export const Button = ({
    label,
    className,
    onClick,
    ...props
}: Readonly<{
  label: string;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}>) => {
    return (
        <button
            className={`w-full min-h-12 py-3 bg-primary rounded-[10px] justify-center items-center inline-flex mt-5 hover:bg-opacity-90 active:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
            onClick={onClick}
            {...props}
        >
            <div className="text-center text-white text-base font-bold">{label}</div>
        </button>
    );
};
