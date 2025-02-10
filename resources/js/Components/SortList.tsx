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
        <div className="p-4">
            <select 
                name="sort" 
                value={value} 
                onChange={onChange}
                className="w-full p-2 border rounded"
            >
                <option value="">Sort List By...</option>
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