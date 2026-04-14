import { useState, useEffect, ReactNode, useRef } from 'react';
import { usePage, useRemember, router } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import { searchDiscogs } from '@/API';

// Component imports
import Footer from '@/Components/Footer';
import Spinner from '@/Components/Spinner';
import AlbumCardSearch from '@/Components/AlbumCardSearch';
import { DiscogsRelease, DiscogsArtist, DiscogsTrack } from '@/types/discogApiTypes';
import Paginator from '@/Components/Paginator';

// Types
import { User } from '@/types/user';

interface PageProps {
    errors: Record<string, string>;
    userWishlistIds: any[];
    userCollectionIds: any[];
    [key: string]: unknown;
    auth: {
        user: User;
    };
}

function Search({ userWishlistIds = [], userCollectionIds = [] }: PageProps) {
    const [search, setSearch] = useRemember('', 'search');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useRemember<DiscogsRelease[]>([], 'results');
    const [addToWishlist, setAddToWishlist] = useState<Record<string, boolean>>(
        () => Object.fromEntries(userWishlistIds.map(id => [id, true]))
    );
    const [addToCollection, setAddToCollection] = useState<Record<string, boolean>>(
        () => Object.fromEntries(userCollectionIds.map(id => [id, true]))
    );
    const [wishlistErrors, setWishlistErrors] = useState<Record<string, string>>({});
    const [pendingWishlistId, setPendingWishlistId] = useState<string | number | null>(null);
    const [collectionErrors, setCollectionErrors] = useState<Record<string, string>>({});
    const [pendingCollectionId, setPendingCollectionId] = useState<string | number | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);
    //pagination states
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<{ 
        page: number; 
        pages: number; 
        per_page: number; 
        items: number 
    } | null>(null);

    const { errors } = usePage<PageProps>().props;
    const { auth } = usePage().props as {
        auth: { user: { name: string } | null };
    };

    // Validation error handling
    // Use effects to watch for changes in errors and pending IDs, and update error states accordingly
    useEffect(() => {
        if (errors?.wishlist && pendingWishlistId) {
            setWishlistErrors(prev => ({ ...prev, [pendingWishlistId]: errors.wishlist }));
            setPendingWishlistId(null);
        }
    }, [errors, pendingWishlistId]);

    useEffect(() => {
        if (errors?.collection && pendingCollectionId) {
            setCollectionErrors(prev => ({ ...prev, [pendingCollectionId]: errors.collection }));
            setPendingCollectionId(null);
        }
    }, [errors, pendingCollectionId]);

    // Searches Discogs API and updates results and pagination state
    const searchDiscogsFn = async (pageNumber: number = 1) => {
        if (!search.trim()) return;

        setIsSearching(true);
        setSearchError(null);

        try {
            const data = await searchDiscogs(search.trim(), pageNumber);
            setResults(data.results ?? []);
            setPagination(data.pagination ?? null);
            setPage(pageNumber);
        } catch (err) {
            console.error('Discogs search error:', err);
            setSearchError('Something went wrong. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const dismissKeyboardRef = useRef<HTMLInputElement>(null);

    const handleSearchSubmit = () => {
        dismissKeyboardRef.current?.blur();
        setPage(1);
        searchDiscogsFn(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') searchDiscogsFn();
    };

    const handleAddToWishList = (item: DiscogsRelease) => {
        setWishlistErrors(prev => { const next = { ...prev }; delete next[item.id]; return next; });
        setPendingWishlistId(item.id);

        router.post('/wishlist', { album: JSON.stringify(item) }, {
            preserveScroll: true,
            onSuccess: () => { setAddToWishlist(prev => ({ ...prev, [item.id]: true })); setPendingWishlistId(null); },
            onError: () => {}
        });
    };

    const handleAddToCollection = (item: DiscogsRelease) => {
        const isInWishlist = userWishlistIds.includes(item.id);
        setCollectionErrors(prev => { const next = { ...prev }; delete next[item.id]; return next; });
        setPendingCollectionId(item.id);

        router.post('/collection', { album: JSON.stringify(item), removeFromWishlist: isInWishlist }, {
            preserveScroll: true,
            onSuccess: () => { setAddToCollection(prev => ({ ...prev, [item.id]: true })); setPendingCollectionId(null); },
            onError: () => {}
        });
    };

    // Scrolls window to top after pagination changes
    const scrollToTop = () => {
        window.scrollTo({ top: 0 });
    };

    return (
        <div className="text-gray-300 bg-neutral-950 height-full min-h-screen">
            <div className="p-4 text-center pt-20">
                <h1 className='text-5xl font-header pt-16 pb-12'>Album Finder</h1>
            </div>

            <div className="font-mono p-2 m-2 max-w-lg md:mx-auto">
                <form role="search" onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}>
                    <label htmlFor="searchbar" className="block mb-2 text-lg">
                        Search for an album
                    </label>
                    <div className="flex">
                        <input
                            ref={dismissKeyboardRef}
                            type="search"
                            id="searchbar"
                            name="searchbar"
                            placeholder="e.g. Pink Floyd, The Dark Side of the Moon"
                            value={search}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            aria-label="Search Discogs by album or artist name"
                            className="w-2/3 p-2 border-2 rounded border-yellow-800 focus:border-green-400 bg-neutral-950"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-neutral-950 text-gray-300 border-2 border-green-800 rounded"
                            aria-label="Perform search"
                        >
                            Search
                        </button>
                    </div>
                </form>
                {isSearching && <Spinner />}
                {searchError && <p className="mt-2 text-red-500 font-mono">{searchError}</p>}
            </div>

            {results.length > 0 && (
                <h2 className="p-4 text-2xl font-mono text-center pt-16">Search Results</h2>
            )}

            <div>
                {pagination && pagination.pages > 1 && (
                    <Paginator
                        page={page}
                        pagination={pagination}
                        isSearching={isSearching}
                        searchDiscogsFn={searchDiscogsFn}
                        scrollToTop={scrollToTop}
                    />
                )}
            </div>

            <div className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-3 lg:grid-cols-5 p-4 min-h-screen">
                {results.map((item) => (
                    <AlbumCardSearch
                        key={item.id}
                        item={item}
                        auth={auth}
                        addToWishlist={addToWishlist}
                        addToCollection={addToCollection}
                        wishlistErrors={wishlistErrors}
                        collectionErrors={collectionErrors}
                        handleAddToWishList={handleAddToWishList}
                        handleAddToCollection={handleAddToCollection}
                    />
                ))}
            </div>

            <div>
                {pagination && pagination.pages > 1 && (
                    <Paginator
                        page={page}
                        pagination={pagination}
                        isSearching={isSearching}
                        searchDiscogsFn={searchDiscogsFn}
                        scrollToTop={scrollToTop}
                        
                    />
                )}
            </div>

            <Footer />
        </div>
    );
}

Search.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Search;