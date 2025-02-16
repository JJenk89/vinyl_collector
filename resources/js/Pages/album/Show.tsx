import { ReactNode } from 'react';
import Header from '@/Layouts/Header';
import { Inertia } from '@inertiajs/inertia';

type AlbumProps = {
    album: {
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
};

const Album = ({ album }: AlbumProps) => {
    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    const handleAddtoCollection = () => {
        Inertia.post('/collection', { album: JSON.stringify(album) });
    };

    const handleAddtoWishlist = () => {
        Inertia.post('/wishlist', { album: JSON.stringify(album) });
    };

    const getReleaseYear = (releaseDate: string) => {
        return releaseDate ? new Date(releaseDate).getFullYear() : "Unknown";
    }

    return (
        <div> {/* Container div - style later */}

            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">{album.name}</h1>
            </div>

            <div className="p-2">

                <div className="flex justify-evenly p-4">
                    <button 
                        className='p-2 bg-blue-950 text-white rounded'
                        onClick={handleAddtoCollection}
                    >Add to Collection</button>

                    <button 
                        className='p-2 bg-blue-950 text-white rounded'
                        onClick={handleAddtoWishlist}
                    >Add to Wishlist</button>
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