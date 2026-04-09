export type View = "card" | "list";

export type ViewToggleProps = {
    view: View;
    onToggle: (view: View) => void;
};

const ViewToggle = ({ view, onToggle }: ViewToggleProps) => {
    return ( 
        <div className="flex gap-2 pt-4 justify-end">
            <p className="flex items-center">View:</p>
            <button
                onClick={() => onToggle('card')}
                aria-label="Card view"
                className={`p-2 rounded ${view === 'card' ? 'text-white bg-neutral-700' : 'text-gray-500 hover:text-gray-300'}`}
            >
                {/* Grid icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                </svg>
            </button>
            <button
                onClick={() => onToggle('list')}
                aria-label="List view"
                className={`p-2 rounded ${view === 'list' ? 'text-white bg-neutral-700' : 'text-gray-500 hover:text-gray-300'}`}
            >
                {/* List icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
                </svg>
            </button>
        </div>
     );
}
 
export default ViewToggle;