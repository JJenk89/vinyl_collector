import { useState, useEffect, ReactNode } from 'react';
import { usePage, useRemember, router } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import { searchDiscogs } from '@/API';

// Component imports
import Footer from '@/Components/Footer';
import Spinner from '@/Components/Spinner';
import AlbumCardSearch, { DiscogsItem } from '@/Components/AlbumCardSearch';

// Types
import { User } from '@/types/user';

interface PageProps {
    errors: Record<string, string>;
    userWishlistIds: string[];
    userCollectionIds: string[];
    [key: string]: unknown;
    auth: {
        user: User;
    };
}

function Search({ userWishlistIds = [], userCollectionIds = [] }: PageProps) {
    const [search, setSearch] = useRemember('', 'search');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useRemember<DiscogsItem[]>([], 'results');
    const [addToWishlist, setAddToWishlist] = useState<Record<string, boolean>>(
        () => Object.fromEntries(userWishlistIds.map(id => [id, true]))
    );
    const [addToCollection, setAddToCollection] = useState<Record<string, boolean>>(
        () => Object.fromEntries(userCollectionIds.map(id => [id, true]))
    );
    const [wishlistErrors, setWishlistErrors] = useState<Record<string, string>>({});
    const [pendingWishlistId, setPendingWishlistId] = useState<string | null>(null);
    const [collectionErrors, setCollectionErrors] = useState<Record<string, string>>({});
    const [pendingCollectionId, setPendingCollectionId] = useState<string | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);

    const { errors } = usePage<PageProps>().props;
    const { auth } = usePage().props as {
        auth: { user: { name: string } | null };
    };

    // Validation error handling
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

    const searchDiscogsFn = async () => {
        if (!search.trim()) return;

        setIsSearching(true);
        setSearchError(null);

        try {
            const data = await searchDiscogs(search.trim());
            setResults(data.results ?? []);
        } catch (err) {
            console.error('Discogs search error:', err);
            setSearchError('Something went wrong. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') searchDiscogsFn();
    };

    const handleAddToWishList = (item: DiscogsItem) => {
        setWishlistErrors(prev => { const next = { ...prev }; delete next[item.id]; return next; });
        setPendingWishlistId(item.id);

        router.post('/wishlist', { album: JSON.stringify(item) }, {
            preserveScroll: true,
            onSuccess: () => { setAddToWishlist(prev => ({ ...prev, [item.id]: true })); setPendingWishlistId(null); },
            onError: () => {}
        });
    };

    const handleAddToCollection = (item: DiscogsItem) => {
        const isInWishlist = userWishlistIds.includes(item.id);
        setCollectionErrors(prev => { const next = { ...prev }; delete next[item.id]; return next; });
        setPendingCollectionId(item.id);

        router.post('/collection', { album: JSON.stringify(item), removeFromWishlist: isInWishlist }, {
            preserveScroll: true,
            onSuccess: () => { setAddToCollection(prev => ({ ...prev, [item.id]: true })); setPendingCollectionId(null); },
            onError: () => {}
        });
    };

    return (
        <div className="text-gray-300 bg-neutral-950 height-full min-h-screen">
            <div className="p-4 text-center pt-20">
                <h1 className='text-5xl font-header pt-16 pb-12'>Album Finder</h1>
            </div>

            <div className="font-mono p-2 m-2 max-w-lg md:mx-auto">
                <form role="search" onSubmit={(e) => { e.preventDefault(); searchDiscogsFn(); }}>
                    <label htmlFor="searchbar" className="block mb-2 text-lg">
                        Search for an album
                    </label>
                    <div className="flex">
                        <input
                            type="search"
                            id="searchbar"
                            name="searchbar"
                            placeholder="Search by artist name or album"
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

            <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-3 lg:grid-cols-5 p-4 min-h-screen">
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

            <Footer />
        </div>
    );
}

Search.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Search;