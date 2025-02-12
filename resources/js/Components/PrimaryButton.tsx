import { ButtonHTMLAttributes } from 'react';
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: PrimaryButtonProps) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
