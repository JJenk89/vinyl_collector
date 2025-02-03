import { ReactNode } from 'react';
import Header from '@/Layouts/Header';

type AlbumProps = {
    album: {
        name: string;
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

    return (
        <div>
            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">{album.name}</h1>
            </div>
            <div className="p-4">
                <img src={album.images[0].url} alt={album.name} className="w-64 h-64 mx-auto" />
                <h2 className="text-2xl font-bold mt-4">{album.artists[0].name}</h2>
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