import { ButtonHTMLAttributes } from 'react';

type Album = {
    album_id: number;
    name: string;
    artist: string;
    images: { url: string }[];
};
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    album: Album;
    handleRemove: (album: Album) => void;
}

export default function PrimaryButton({
    album,
    handleRemove,
    className = '',
    disabled,
    children,
    ...props
}: PrimaryButtonProps) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            onClick={() => handleRemove(album)}
        >
            {children}
        </button>
    );
}
