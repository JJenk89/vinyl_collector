type SearchBarProps = {
    filter: string;
    searchFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchType: string;
}

const SearchBar = ({ filter, searchFilter, searchType }: SearchBarProps) => {
    return ( 
        <div className="mt-4">
            <input
                type="text"
                value={filter}
                onChange={searchFilter}
                placeholder={`Search ${searchType}...`}
                className="w-full p-2 border border-indigo-600 rounded bg-neutral-950 text-gray-200"
            />
        </div>
     );
}
 
export default SearchBar;