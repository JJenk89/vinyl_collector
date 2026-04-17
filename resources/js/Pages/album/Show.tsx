import { ReactNode, useState, useEffect } from 'react';
import Header from '@/Layouts/Header';
import { router, usePage } from '@inertiajs/react';
import MiniNav from '@/Components/MiniNav';
import AuthPrompt from '@/Components/AuthPrompt';
import Spinner from '@/Components/Spinner';
import { getAlbumDetails } from '@/API';
import { DiscogsRelease, DiscogsArtist, DiscogsTrack } from '@/types/discogApiTypes';

type AlbumProps = {
    album: DiscogsRelease;
    userWishlistIds: string[];
    userCollectionIds: string[];
};

const Album = ({ album, userWishlistIds = [], userCollectionIds = [] }: AlbumProps) => {
    const [loading, setLoading] = useState(false);
    const [releaseData, setReleaseData] = useState<DiscogsRelease | null>(null);

    // Fetch detailed release data if we only have search result data
    useEffect(() => {
        const fetchReleaseDetails = async () => {
            // If we already have tracklist, no need to fetch
            if (album.tracklist && album.tracklist.length > 0) {
                setReleaseData(album);
                return;
            }

            // If we have a resource_url or id, fetch the full release
            if (album.resource_url || album.id) {
                setLoading(true);
                try {
                    const releaseId = album.id;
                    const data = await getAlbumDetails(releaseId.toString());
                    setReleaseData(data);
                } catch (error) {
                    console.error('Error fetching release details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchReleaseDetails();
    }, [album]);

    // Use the fetched data if available, otherwise use the passed album prop
    const displayData = releaseData || album;

    // Check if album is in user's wishlist or collection
    const isInWishlist = userWishlistIds.includes(displayData.id.toString());
    const isInCollection = userCollectionIds.includes(displayData.id.toString());
    const shouldShowWishlistButton = !isInCollection;

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    const formatDuration = (duration: string) => {
        if (!duration) return '--:--';
        return duration;
    };

    const handleAddtoCollection = () => {
        router.post('/collection', { 
            album: JSON.stringify(displayData), 
            removeFromWishlist: isInWishlist 
        });
    };

    const handleAddtoWishlist = () => {
        router.post('/wishlist', { 
            album: JSON.stringify(displayData) 
        });
    };

    
    const getArtistName = () => {
        if (displayData.artists && displayData.artists.length > 0) {
            return displayData.artists[0].name;
        }
        // Discogs sometimes displays artist name in the title (e.g., "The Cult - The Cult")
        // This removes the artist prefix if it's present in the title
        if (displayData.title && displayData.title.includes(' - ')) {
            return displayData.title.split(' - ')[0];
        }
        return displayData.artist || 'Unknown Artist';
    };

    // Get the album title without artist prefix
    const getAlbumTitle = () => {
        if (displayData.title && displayData.title.includes(' - ')) {
            return displayData.title.split(' - ')[1];
        }
        return displayData.title || 'Unknown Album';
    };

    const getCoverImage = () => {
        if (displayData.images && displayData.images.length > 0) {
            return displayData.images[0].resource_url || displayData.images[0].uri;
        }
        return displayData.cover_image || displayData.thumb || '';
    };

    const getReleaseYear = () => {
        if (displayData.year) return displayData.year;
        if (displayData.released) {
            const yearMatch = displayData.released.match(/\d{4}/);
            if (yearMatch) return parseInt(yearMatch[0]);
        }
        return 'Unknown';
    };

    const getLabel = () => {
        if (displayData.label && displayData.label.length > 0) {
            return displayData.label[0];
        } else if (displayData.labels && displayData.labels.length > 0) {
            return displayData.labels[0].name;
        } else {
            return 'No label information available';
        }
    }



    if (loading) {
        return (
            <div className='bg-neutral-950 font-mono min-h-screen'>
                <MiniNav />
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            </div>
        );
    }

    return (
        <div className='bg-neutral-950 font-mono min-h-screen pt-16'>
            <MiniNav />

            <div className="p-4 text-center">
                <h1 className="text-4xl font-black text-gray-300 font-mono">{getAlbumTitle()}</h1>
            </div>

            <div className="p-2 text-gray-300">
                <div className="flex justify-evenly p-4 gap-4">
                    {!auth.user ? (
                        <AuthPrompt />
                    ) : (
                        <>
                            <button 
                                className={`p-3 rounded w-full max-w-40 max-h-28 h-18 transition-colors ${
                                    isInCollection 
                                        ? 'bg-green-900 cursor-not-allowed border bg-opacity-30 border-green-600 text-gray-100' 
                                        : 'bg-green-900 bg-opacity-60 border border-green-600 hover:bg-green-700 text-white'
                                }`}
                                onClick={handleAddtoCollection}
                                disabled={isInCollection}
                            >
                                {isInCollection ? 'In Your Collection!' : 'Add to Collection'}
                            </button>

                            {shouldShowWishlistButton && (
                                <button 
                                    className={`p-3 rounded w-full max-w-40 max-h-28 h-18 transition-colors ${
                                        isInWishlist 
                                            ? 'bg-transparent cursor-not-allowed border bg-opacity-30 border-yellow-600 bg-yellow-950  text-gray-100' 
                                            : 'bg-transparent hover:bg-yellow-700 text-white'
                                    }`}
                                    onClick={handleAddtoWishlist}
                                    disabled={isInWishlist}
                                >
                                    {isInWishlist ? 'In Your Wishlist!' : 'Add to Wishlist'}
                                </button>
                            )}
                        </>
                    )} 
                </div>

                {getCoverImage() ? (
                    <img 
                        src={getCoverImage()} 
                        alt={getAlbumTitle()} 
                        className="w-64 h-64 md:w-80 md:h-80 mx-auto p-4 mt-8 mb-8 shadow-sm shadow-yellow-800 object-cover" 
                    />
                ) : (
                    <div className="w-64 h-64 md:w-80 md:h-80 mx-auto p-4 mt-8 mb-8 border-2 border-yellow-800 rounded flex items-center justify-center">
                        <p className="text-gray-300 text-center">No Cover Image Available</p>
                    </div>
                )}

                <div className='text-center'>
                    <h2 className="text-3xl font-bold mt-4 mb-4">
                        by <span className="text-yellow-800">{getArtistName()}</span>
                    </h2>

                    <span className="italic">
                        Release Year: <span className="text-yellow-800">{getReleaseYear()}</span>
                    </span>

                    {displayData.styles && displayData.styles.length > 0 && (
                        <div className="mt-2">
                            <p className="italic">
                                Genre: <span className="text-yellow-800">{displayData.styles.join(', ')}</span>
                            </p>
                            <p className="italic">
                                Label: <span className="text-yellow-800">{getLabel()}</span>
                            </p>
                        </div>
                    )}
                </div>

                {displayData.tracklist && displayData.tracklist.length > 0 ? (
    <div className="mt-8 max-w-2xl mx-auto px-4">
        <ul className="border border-3 border-yellow-800 rounded p-4">
            <li className="flex justify-between border-b border-yellow-800 pb-2 mb-2 font-bold">
                <span className="flex-1 pr-4">Track</span>
                <span className="w-20 text-right">Duration</span>
            </li>
            {displayData.tracklist.map((track, index) => (
                <li key={index} className="flex justify-between gap-4 mt-2 hover:bg-yellow-900/20 p-1 rounded">
                    <div className="flex-1 min-w-0">
                        {track.position && (
                            <span className="text-yellow-800 mr-2 font-mono text-sm whitespace-nowrap">
                                {track.position}.
                            </span>
                        )}
                        <span className="break-words" title={track.title}>
                            {track.title}
                        </span>
                    </div>
                    <span className="font-mono text-sm whitespace-nowrap">
                        {formatDuration(track.duration)}
                    </span>
                </li>
            ))}
        </ul>
    </div>
) : (
    <p className="text-center mt-8 text-gray-300">No track listing available</p>
)}
            </div>
        </div>
    );
};

Album.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Album;