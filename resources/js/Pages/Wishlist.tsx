import {useState} from 'react';
import Header from '@/Layouts/Header';
import { Link, usePage, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SortSelect from '@/Components/SortList';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteButton from '@/Components/DeleteButton';

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
                    data: { album_id: album.album_id },
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
            <div className="container mx-auto p-6 bg-neutral-950 text-gray-300 min-h-screen pt-20">
                <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>


                {!auth.user ? (
                    <p>Please <Link href='/register' className='underline text-indigo-600'>create an account</Link> or <Link href='/login' className='underline text-indigo-600'>log in</Link> to create a wishlist!
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-950">
                                                {wishlistItems.map((album) => (
                                                    <div 
                                                    key={album.album_id} 
                                                    className="bg-neutral-950 shadow-md rounded-lg p-4 border border-indigo-700"
                                                >
                                                    <h2 className="text-xl font-semibold">{album.name}</h2>
                                                    <p className="text-gray-500 mt-2 mb-2">{album.artist}</p>
                                                
                                                    <div className="flex justify-between">
                                                
                                                    <PrimaryButton>
                                                        <Link 
                                                            href={`/album/${album.album_id}`} 
                                                            >
                                                            View Album
                                                        </Link>
                                                    </PrimaryButton>
                    
                                                    <DeleteButton onClick={() => handleRemoveFromWishlist(album)}>
                                                        Delete Album
                                                    
                                                    </DeleteButton>
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