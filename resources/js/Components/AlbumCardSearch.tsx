import { Link } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import AuthPrompt from './AuthPrompt';
import { AuthProp } from '@/types/user';
import { DiscogsArtist, DiscogsRelease, DiscogsTrack } from '@/types/discogApiTypes';

type AlbumCardSearchProps = {
    item: DiscogsRelease;
    auth: AuthProp;
    addToWishlist: { [key: string]: boolean };
    addToCollection: { [key: string]: boolean };
    wishlistErrors: { [key: string]: string };
    collectionErrors: { [key: string]: string };
    handleAddToWishList: (item: DiscogsRelease) => void;
    handleAddToCollection: (item: DiscogsRelease) => void;
};

function parseDiscogsTitle(rawTitle: string): { artist: string; album: string } {
    const separatorIndex = rawTitle.indexOf(' - ');
    if (separatorIndex === -1) {
        return { artist: 'Unknown Artist', album: rawTitle };
    }
    return {
        artist: rawTitle.slice(0, separatorIndex).trim(),
        album: rawTitle.slice(separatorIndex + 3).trim()
    };
}

const AlbumCardSearch = ({
    item,
    auth,
    addToWishlist,
    addToCollection,
    wishlistErrors,
    collectionErrors,
    handleAddToWishList,
    handleAddToCollection,
}: AlbumCardSearchProps) => {
    const { artist, album } = parseDiscogsTitle(item.title);

    return (
        <div className="p-4 border-2 border-indigo-700 rounded max-h-full flex flex-col justify-between">
            <h3 className="text-lg font-bold pb-2">{album}</h3>
            <p className="text-gray-400 text-sm mb-2 italic">{artist}</p>

            {item.cover_image ? (
                <Link href={`/album/${item.id}`}>
                    <img
                        src={item.cover_image}
                        alt={item.title}
                        className="w-full h-auto border border-yellow-700 p-1 rounded-md"
                    />
                </Link>
            ) : <Link href={`/album/${item.id}`}>
                    <p className="text-gray-300">No Cover Image Available</p>
                </Link>}

            <p className="font-mono pt-4 text-lg">{item.format?.join(', ')}</p>
            <p className="font-mono pt-4 text-lg">{item.styles?.join(', ')}</p>
            <p className="font-mono pt-4 text-md">{item.label?.[0] || 'No label information available'}</p>

            {item.year && (
                <p className="font-mono text-sm text-gray-400">{item.country} · {item.year}</p>
            )}

            {(wishlistErrors[item.id] || collectionErrors[item.id]) && (
                <p className="mt-2 text-red-600 font-mono" role="alert">
                    {wishlistErrors[item.id] || collectionErrors[item.id]}
                </p>
            )}

            <div className="buttons flex flex-col gap-2 mt-4">
                {!auth.user ? (
                    <AuthPrompt />
                ) : (
                    <>
                        <PrimaryButton
                            className="mt-2 bg-yellow-600 hover:bg-yellow-400 wishlist-btn"
                            onClick={() => handleAddToWishList(item)}
                            disabled={addToWishlist[item.id] || addToCollection[item.id]}
                        >
                            {addToWishlist[item.id] ? 'In Wishlist' : 'Add to Wishlist'}
                        </PrimaryButton>

                        <PrimaryButton
                            className="mt-2 collection-btn"
                            onClick={() => handleAddToCollection(item)}
                            disabled={addToCollection[item.id]}
                        >
                            {addToCollection[item.id] ? 'In Collection' : 'Add to Collection'}
                        </PrimaryButton>
                    </>
                )}
            </div>
        </div>
    );
};

export default AlbumCardSearch;