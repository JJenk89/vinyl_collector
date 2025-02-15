import {useState} from 'react';
import Header from '@/Layouts/Header';
import { Link, usePage, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SortSelect from '@/Components/SortList';

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
    const [sortOption, setSortOption] = useState<string>('');

    const sortOptions = [
        { value: 'albumAsc', label: 'Album Name (A to Z)' },
        { value: 'albumDesc', label: 'Album Name (Z to A)' },
        { value: 'artistAsc', label: 'Artist Name (A to Z)' },
        { value: 'artistDesc', label: 'Artist Name (Z to A)' }
    ];

    const handleRemoveFromWishlist = (album: Album) => {
        Inertia.delete('/wishlist/remove', {
                    data: { album: JSON.stringify(album) },
                    onSuccess: () => {
                        setWishlistItems((prev) => prev.filter((a) => a.album_id !== album.album_id));
                    }
                });
    };

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortOption(value);

        let sortedItems = [...wishlistItems];
        switch(value) {
            case "albumAsc":
                sortedItems = sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            
            case "albumDesc":
                sortedItems = sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;

            case "artistAsc":
                sortedItems = sortedItems.sort((a, b) => {
                    const artistA = a.artist.replace(/^the\s+/i, '').trim();
                    const artistB = b.artist.replace(/^the\s+/i, '').trim();
                    return artistA.localeCompare(artistB);
                });
                break;

            case "artistDesc":
                sortedItems = sortedItems.sort((a, b) => {
                    const artistA = a.artist.replace(/^the\s+/i, '').trim();
                    const artistB = b.artist.replace(/^the\s+/i, '').trim();
                    return artistB.localeCompare(artistA);
                });
                break;

            default:
                sortedItems = wishlist;
        }

        setWishlistItems(sortedItems);
    };

    return (
        <div>
            <Head title="My Wishlist" />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>


                {!auth.user ? (
                    <p>You must <Link href='/register' className='underline text-blue-600'>create an account</Link> or <Link href='/login' className='underline text-blue-600'>log in</Link> to create a wishlist!
                    </p>
                ) 
                    
                    : 
                    
                    (
                        <>
                            <div className="p-4">
                    <h4 className="text-1xl font-semibold">Sort Wishlist</h4>

                    <p className="py-2">By default your list will be sorted by the date you added the album to it</p>

                    <SortSelect 
                        options={sortOptions}
                        value={sortOption}
                        onChange={handleSort}
                    />
                </div>
                
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {wishlistItems.map((album: Album) => (
                            <div 
                                key={album.album_id} 
                                className="bg-white shadow-md rounded-lg p-4"
                            >
                                <h2 className="text-xl font-semibold">{album.name}</h2>
                                <p className="text-gray-600">{album.artist}</p>

                                <div className="flex justify-between">

                                <Link 
                                    href={`/album/${album.album_id}`} 
                                    className="p-1 bg-blue-950 text-white rounded hover:bg-blue-700 transition-colors">
                                        View Album
                                </Link>
                                <button
                                    className="p-1 border-2 border-solid border-red-700 bg-white text-red-900 rounded hover:bg-red-700 hover:text-white transition-colors"
                                    onClick={() => handleRemoveFromWishlist(album)}>Delete Album
                                </button>

                           

                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
                        </>
                    )
                
                }

                
            </div>
        </div>
    );
};

Wishlist.layout = (page: React.ReactNode) => <Header children={page} />;

export default Wishlist;