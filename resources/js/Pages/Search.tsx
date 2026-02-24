import { useState, useEffect, ReactNode } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import axios from 'axios';
import useSpotifyToken from '@/Hooks/useSpotifyToken';
import Footer from '@/Components/Footer';
import Spinner from '@/Components/Spinner';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthPrompt from '@/Components/AuthPrompt';

interface SpotifyItem {
    id: string;
    name: string;
    images: { url: string }[];
    type: string;
    artists: string;
}
interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    errors: Record<string, string>;
    userWishlistIds: string[]; // Array of Spotify album IDs in wishlist
    userCollectionIds: string[]; // Array of Spotify album IDs in collection
    [key: string]: unknown;
    auth: {
        user: User;
    };
}

function Search({ userWishlistIds = [], userCollectionIds = [] }: PageProps) {
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SpotifyItem[]>([]);
    const [addToWishlist, setAddToWishlist] = useState<Record<string, boolean>>(() => Object.fromEntries(userWishlistIds.map(id => [id, true])));
    const [addToCollection, setAddToCollection] = useState<Record<string, boolean>>(() => Object.fromEntries(userCollectionIds.map(id => [id, true])));
    const [wishlistErrors, setWishlistErrors] = useState<Record<string, string>>({});
    const [pendingWishlistId, setPendingWishlistId] = useState<string | null>(null);
    const [collectionErrors, setCollectionErrors] = useState<Record<string, string>>({});
    const [pendingCollectionId, setPendingCollectionId] = useState<string | null>(null);
    const { token, loading, error } = useSpotifyToken();
    const { errors } = usePage<PageProps>().props;

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };
    //Error handing useEffects
    // Display validation errors returned from back()->withErrors() for the correct card, and clear them when the user tries to add to wishlist/collection again
    useEffect(() => {
        if (errors?.wishlist && pendingWishlistId) {
            setWishlistErrors(prev => ({
                ...prev,
                [pendingWishlistId]: errors.wishlist
            }));
            setPendingWishlistId(null);
        }

       
    }, [errors, pendingWishlistId]);

    useEffect(() => {
         if (errors?.collection && pendingCollectionId) {
            setCollectionErrors(prev => ({
                ...prev,
                [pendingCollectionId]: errors.collection
            }));
            setPendingCollectionId(null);
        }
    }, [errors, pendingCollectionId]);

    //TODO:
    // 1. Fetch Spotify token ONLY once per hour and for authed users
    // 2. Update spotify token after expiry
    // 3. Store token in session storage

    //THIS USE EFFECT IS FOR TESTING ONLY
    //REPLACE WITH NEW CODE BEFORE DEPLOYMENT
    //
    /* useEffect(() => {
        axios.post('/api/spotify/token')    // This is the route we defined in routes/api.php
                                            // It will return a Spotify token
            .then(res => {
                console.log("Full response:", res.data);
                setToken(res.data.access_token);
            })
            .catch(error => {
                console.error('Error fetching Spotify token:', error);
            });
    }, []); */

    
    const searchSpotify = () => {


        if (!search.trim() || !token ) return;

        if (!token) {
        console.log('Token is empty, returning early');
        return;
        }

        setIsSearching(true);

        axios.get('/api/spotify/search', {
                params: {
                query: search.trim(),
                type: 'album,artist',
            }
    })
        .then(res => {
            let data = res.data;
            console.log(res.data);
    
            const albumResults = data.albums?.items || [];
            const artistResults = data.artists?.items || [];
    
        setResults([...albumResults, ...artistResults]);
        setIsSearching(false);
        })
        .catch(error => {
            console.error("Full error object:", error);
        });
    };

 


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchSpotify();
        }
    };

 const handleAddToWishList = (item: SpotifyItem) => {
        // Clear any previous error for this item before retrying
        setWishlistErrors(prev => {
            const next = { ...prev };
            delete next[item.id];
            return next;
        });

        setPendingWishlistId(item.id);

        router.post('/wishlist', { album: JSON.stringify(item) }, {
            preserveScroll: true,
            onSuccess: () => {
                setAddToWishlist(prev => ({ ...prev, [item.id]: true }));
                setPendingWishlistId(null);
            },
            onError: () => {
                // onError fires for validation errors returned by back()->withErrors()
                // The useEffect above handles attributing the error to the correct card
            }
        });
    };

    const handleAddToCollection = (item: SpotifyItem) => {

        const isInWishlist = userWishlistIds.includes(item.id);


        setCollectionErrors(prev => {
        const next = { ...prev };
        delete next[item.id];
        return next;
    });

        setPendingCollectionId(item.id);

        router.post('/collection', { album: JSON.stringify(item), removeFromWishlist: isInWishlist }, {
            preserveScroll: true,
            onSuccess: () => {
                setAddToCollection(prev => ({ ...prev, [item.id]: true }));
                setPendingCollectionId(null);
            },
            onError: () => {
                // onError fires for validation errors returned by back()->withErrors()
                // The useEffect above handles attributing the error to the correct card
            }
        });
    };

   

    return (
        <div className="text-gray-300 bg-neutral-950 height-full min-h-screen">
                <div className="p-4 text-center pt-20">
                    <h1 className='text-5xl  font-header pt-16 pb-12'>Album Finder</h1>
                     
                </div>
            
            
            
                <>
                    <div className=" font-mono p-2 m-2 max-w-lg md:mx-auto">
                <form role="search" onSubmit={(e) => {
                    e.preventDefault();
                    searchSpotify();
                    }}>

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
                                aria-label="Search Spotify by album or artist name"
                                className="w-2/3 p-2 border-2 rounded border-yellow-800 focus:border-green-400 bg-neutral-950"
                            />

                            <button 
                              type="submit" 
                              className="p-2 bg-neutral-950 text-gray-300 border-2 border-green-800 rounded"
                              aria-label="Perform search"
                            > Search
                            </button>
                        </div>
                    </form>
                    {loading && <Spinner />}
                    {isSearching && <Spinner />}
                </div>
                </>

            {/* SEARCH RESULTS */}

            

            {error && <p>Error: {error.message}</p>}

           
                <>
                    {results.length > 0 && <h2 className="p-4 text-2xl font-mono text-center pt-16">Search Results</h2>}

                    <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-3 lg:grid-cols-5 p-4 min-h-screen">
                        {results.map((item, index) => (
                            <div key={index} className="p-4 border-2 border-indigo-800 rounded">
                                <h3 className="text-lg font-bold pb-2">{item.name}</h3>
                                {item.images && item.images.length > 0 && (
                                    <Link href={`/album/${item.id}`}><img src={item.images[0].url} alt={item.name} className="w-full h-auto border border-yellow-700 p-1 rounded-md" /></Link>
                                )}
                                <p className='font-mono pt-4 text-lg'>{item.type}</p>

                                {(wishlistErrors[item.id] || collectionErrors[item.id]) && (
                                    <p className="mt-2 text-red-600 font-mono" role="alert">
                                {wishlistErrors[item.id] || collectionErrors[item.id]}
                                    </p>
                                )}

                                

                                <div className="buttons flex flex-col gap-2 mt-4">

                                {!auth.user ? (<AuthPrompt />) :
                                (
                                <>
                                <PrimaryButton className="mt-2 bg-yellow-600 hover:bg-yellow-400 wishlist-btn" onClick={() => handleAddToWishList(item)}
                                    disabled={addToWishlist[item.id] || addToCollection[item.id]}
                                    >
                                        {(addToWishlist[item.id]) ? "In Wishlist" : "Add to Wishlist"}
                                    </PrimaryButton>

                                    <PrimaryButton className="mt-2 collection-btn" onClick={() =>
                                        handleAddToCollection(item)}
                                        disabled={addToCollection[item.id]}
                                    >
                                        {addToCollection[item.id] ? "In Collection" : "Add to Collection"}
                                    </PrimaryButton>
                                    </>
                                )}
                                    

                                </div>
                            </div>
                        ))}
                    </div>
                </>
            
            
                
            <Footer />
        </div>
    );
}

Search.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Search;