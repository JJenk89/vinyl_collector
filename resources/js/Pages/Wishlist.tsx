import {useState} from 'react';
import Header from '@/Layouts/Header';
import { Link, router } from '@inertiajs/react';

type Album = {
    album_id: number;
    name: string;
    artist: string;
    images: { url: string }[];
};

type WishlistProps = {
    wishlist: Album[];
};

const Wishlist = ({ wishlist }: WishlistProps) => {

    const [wishlistItems, setWishlistItems] = useState<Album[]>(wishlist);

    const handleRemoveFromWishlist = (album: any) => {
        router.delete('/wishlist/remove', {
                    data: { album: JSON.stringify(album) },
                    onSuccess: () => {
                        setWishlistItems((prev) => prev.filter((a) => a.album_id !== album.album_id));
                    }
                });
    };

    return (
        <div>
            
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
                
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {wishlist.map((album: Album) => (
                            <div 
                                key={album.album_id} 
                                className="bg-white shadow-md rounded-lg p-4"
                            >
                                <h2 className="text-xl font-semibold">{album.name}</h2>
                                <p className="text-gray-600">{album.artist}</p>

                                <div className="flex justify-between">
                                <Link href={`/album/${album.album_id}`} className="p-1 bg-blue-950 text-white rounded">View Album</Link>
                                <button
                                    className="p-1 bg-red-900 text-white rounded"
                                    onClick={() => handleRemoveFromWishlist(album)}>Delete Album
                                </button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

Wishlist.layout = (page: React.ReactNode) => <Header children={page} />;

export default Wishlist;