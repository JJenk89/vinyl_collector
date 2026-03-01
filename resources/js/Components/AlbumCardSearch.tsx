import { Link } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import AuthPrompt from './AuthPrompt';
import { AuthProp } from '@/types/user';

export type DiscogsItem = {
    id: string;
    title: string;
    cover_image: string;
    type: string;
    year?: string;
    country?: string;
}

type AlbumCardSearchProps = {
    item: DiscogsItem;
    auth: AuthProp;
    addToWishlist: { [key: string]: boolean };
    addToCollection: { [key: string]: boolean };
    wishlistErrors: { [key: string]: string };
    collectionErrors: { [key: string]: string };
    handleAddToWishList: (item: DiscogsItem) => void;
    handleAddToCollection: (item: DiscogsItem) => void;
};

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
    return (
        <div className="p-4 border-2 border-indigo-800 rounded">
            <h3 className="text-lg font-bold pb-2">{item.title}</h3>

            {item.cover_image && (
                <Link href={`/album/${item.id}`}>
                    <img
                        src={item.cover_image}
                        alt={item.title}
                        className="w-full h-auto border border-yellow-700 p-1 rounded-md"
                    />
                </Link>
            )}

            <p className="font-mono pt-4 text-lg">{item.type}</p>

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