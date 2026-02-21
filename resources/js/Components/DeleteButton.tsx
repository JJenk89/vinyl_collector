import { ButtonHTMLAttributes } from 'react';
interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function DeleteButton({
    className = '',
    disabled,
    children,
    ...props
}: DeleteButtonProps) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border bg-transparent border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 transition duration-150 ease-in-out hover:bg-red-500 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
