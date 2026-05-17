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
                `h-12 min-w-20 inline-flex items-center rounded-md border-2 border-green-800 bg-transparent  text-sm  text-white transition duration-150 ease-in-out hover:bg-green-800 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
