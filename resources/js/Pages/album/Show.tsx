import { ReactNode } from 'react';
import Header from '@/Layouts/Header';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

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


    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    const handleAddtoCollection = () => {
        Inertia.post('/collection', { album: JSON.stringify(album) });

        if (isInWishlist) {
            Inertia.delete('/wishlist/remove', { data: { album_id: album.id } });
            Inertia.visit('/collection');
        }
    };

    const handleAddtoWishlist = () => {
        Inertia.post('/wishlist', { album: JSON.stringify(album) });
    };

    const getReleaseYear = (releaseDate: string) => {
        return releaseDate ? new Date(releaseDate).getFullYear() : "Unknown";
    }

    return (
        <div> {/* Container div - style later */}

        <nav><Link href="/collection" className="underline m-4">Back to Collection</Link></nav>

            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">{album.name}</h1>
            </div>

             <div className="p-2">
                <div className="flex justify-evenly p-4 gap-4">
                    <button 
                        className={`p-3 rounded w-full max-w-xs transition-colors ${
                            isInCollection 
                                ? 'bg-green-200 cursor-not-allowed opacity-75 border-2 border-green-500' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        onClick={handleAddtoCollection}
                        disabled={isInCollection}
                    >
                        {isInCollection ? 'In Your Collection!' : 'Add to Collection'}
                    </button>

                    {/* Conditionally render wishlist button */}
                    {shouldShowWishlistButton && (
                        <button 
                            className={`p-3 rounded w-full max-w-xs transition-colors ${
                                isInWishlist 
                                    ? 'bg-green-200 cursor-not-allowed opacity-75 border-2 border-green-500' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                            onClick={handleAddtoWishlist}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? 'In Your Wishlist!' : 'Add to Wishlist'}
                        </button>
                    )}
                    
                   
                </div>

                <img src={album.images[0].url} alt={album.name} className="w-64 h-64 mx-auto p-4" />

                <h2 className="text-2xl font-bold mt-4">by {album.artists[0].name}</h2>
                <span>Release Year: {getReleaseYear(album.release_date)}</span>

                <ul className="mt-4">
                    {album.tracks.items.map((track) => (
                        <li key={track.track_number} className="flex justify-between mt-2">
                            <span>{track.track_number}. {track.name}</span>
                            <span>{formatDuration(track.duration_ms)}</span>
                        </li>
                    ))}
                </ul>

            </div>
                    
        </div>
    );
};

Album.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Album;