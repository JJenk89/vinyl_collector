type PaginatorProps = {
    page: number;
    pagination: any;
    isSearching: boolean;
    searchDiscogsFn: (pageNumber: number) => void;
    scrollToTop: () => void;
}

const Paginator = ({ page, pagination, isSearching, searchDiscogsFn, scrollToTop }: PaginatorProps) => {
    return ( 
         <div className="flex justify-center items-center space-x-4 mb-8 font-mono">
                        <button
                            type="button"
                            className="p-2 w-28 bg-neutral-950 text-gray-300 border-2 border-green-800 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:border-red-700 disabled:hover:bg-neutral-950 hover:bg-green-800"
                            aria-label="Previous page"
                            onClick={() => {
                                searchDiscogsFn(page - 1);
                                scrollToTop();
                            }}
                            disabled={isSearching || page === 1}
                        >
                            Previous
                        </button>
                        <span className="text-gray-300">
                            Page {pagination.page} of {pagination.pages}
                        </span>
                        <button
                            type="button"
                            className="p-2 w-28 bg-neutral-950 text-gray-300 border-2 border-green-800 hover:bg-green-800 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:border-red-700"
                            aria-label="Next page"
                            onClick={() => {
                                searchDiscogsFn(page + 1);
                                scrollToTop();
                            }}
                            disabled={isSearching || pagination.page === pagination.pages}
                        >
                            Next
                        </button>
                    </div>
     );
}
 
export default Paginator;