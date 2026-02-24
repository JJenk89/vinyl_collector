import { ReactNode } from 'react';
import Header from '@/Layouts/Header';
import { router, usePage } from '@inertiajs/react';
import MiniNav from '@/Components/MiniNav';
import AuthPrompt from '@/Components/AuthPrompt';

type AlbumProps = {
    album: {
        id: string;
        name: string;
        release_date: string;
        images: { url: string }[];
        artists: { name: string }[];
        tracks: {
            items: { 
                name: string;
                duration_ms: number;
                track_number: number;
            }[]
        };
    };
    userWishlistIds: string[]; // Array of Spotify album IDs in wishlist
    userCollectionIds: string[]; // Array of Spotify album IDs in collection
};

const Album = ({ album, userWishlistIds = [], userCollectionIds = [] }: AlbumProps) => {

    // Check if album is in user's wishlist or collection
    const isInWishlist = userWishlistIds.includes(album.id);
    const isInCollection = userCollectionIds.includes(album.id);
    const shouldShowWishlistButton = !isInCollection;

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };


    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    const handleAddtoCollection = () => {

        router.post('/collection', { album: JSON.stringify(album), removeFromWishlist: isInWishlist})
    };

    const handleAddtoWishlist = () => {
        router.post('/wishlist', { album: JSON.stringify(album) });
    };

    const getReleaseYear = (releaseDate: string) => {
        return releaseDate ? new Date(releaseDate).getFullYear() : "Unknown";
    }

    return (
        <div className='bg-neutral-950 font-mono'> {/* Container div - style later */}

        <MiniNav />

            <div className="p-4 text-center">
                <h1 className="text-4xl font-black text-gray-300 font-mono">{album.name}</h1>
            </div>

             <div className="p-2 text-gray-300">
                <div className="flex justify-evenly p-4 gap-4">

                    {!auth.user ? (
                            <AuthPrompt />
                        ) : (
                        <>
                        <button 
                            className={`p-3 rounded w-full max-w-48 transition-colors ${
                            isInCollection 
                                ? 'bg-green-200 cursor-not-allowed border-2 bg-opacity-60 border-green-300 text-gray-100' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                            onClick={handleAddtoCollection}
                            disabled={isInCollection}
                        >
                            {isInCollection ? 'In Your Collection!' : 'Add to Collection'}
                        </button>

                        {/* Conditionally render wishlist button */}

                    {shouldShowWishlistButton && (
                        <button 
                            className={`p-3 rounded w-full max-w-48 transition-colors ${
                                isInWishlist 
                                    ? 'bg-yellow-200 cursor-not-allowed border-2 bg-opacity-60 border-yellow-300 text-gray-100' 
                                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            }`}
                            onClick={handleAddtoWishlist}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? 'In Your Wishlist!' : 'Add to Wishlist'}
                        </button>
                    )}
                        </>)} 
                </div>

                <img src={album.images[0].url} alt={album.name} className="w-64 h-64 md:w-80 md:h-80 mx-auto p-4 mt-8 mb-8 shadow-sm shadow-yellow-800" />

                <div className='text-center'>
                    <h2 className="text-3xl font-bold mt-4 mb-4 ">by <span className="text-yellow-800">{album.artists[0].name}</span></h2>

                    <span className="italic">
                        Release Year: <span className="text-yellow-800">{getReleaseYear(album.release_date)}</span>
                    </span>
                </div>

                <ul className="mt-4 border border-3 border-yellow-800 rounded p-4 max-w-2xl mx-auto">
                    {album.tracks.items.map((track) => (
                        <li key={track.track_number} className="flex justify-between mt-2">
                            <span className="">{track.track_number}. {track.name}</span>
                            <span className="p-1">{formatDuration(track.duration_ms)}</span>
                        </li>
                    ))}
                </ul>

            </div>
                    
        </div>
    );
};

Album.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Album;