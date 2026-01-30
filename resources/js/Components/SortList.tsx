import React from 'react';

type SortOption = {
    value: string;
    label: string;
};

type SortSelectProps = {
    options: SortOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SortSelect: React.FC<SortSelectProps> = ({ options, value, onChange }) => {
    return (
        <div className="">
            <select 
                name="sort" 
                value={value} 
                onChange={onChange}
                className="w-full p-2 border border-indigo-600 focus:indigo-300 rounded bg-neutral-950 text-gray-300"
            >
                <option value="" className="">Sort List By...</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortSelect;