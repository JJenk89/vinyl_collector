import { useState, useMemo } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import SortSelect from '@/Components/SortList';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteButton from '@/Components/DeleteButton';
import Footer from '@/Components/Footer';

type Album = {
    album_id: number;
    name: string;
    artist: string;
};

type WishlistProps = {
    wishlist: Album[];
};

const Wishlist = ({ wishlist }: WishlistProps) => {
    // Keep wishlistItems as the source of truth (only changes on actual deletion)
    const [wishlistItems, setwishlistItems] = useState<Album[]>(wishlist);
    const [sortOption, setSortOption] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const sortOptions = [
        { value: 'albumAsc', label: 'Album Name (A to Z)' },
        { value: 'albumDesc', label: 'Album Name (Z to A)' },
        { value: 'artistAsc', label: 'Artist Name (A to Z)' },
        { value: 'artistDesc', label: 'Artist Name (Z to A)' }
    ];

    const handleRemoveFromWishlist = (album: any) => {
        router.delete('/wishlist/remove', {
            data: { album_id: album.album_id },
            onSuccess: () => {
                setwishlistItems((prev) => prev.filter((a) => a.album_id !== album.album_id));
            }
        });
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortOption(value);
    };

    const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);
    };

    // Use useMemo to compute filtered and sorted items without modifying state
    const filteredAndSortedItems = useMemo(() => {
        // Start with the complete wishlistItems
        let items = [...wishlistItems];

        // Apply filter if it exists
        if (filter.trim() !== '') {
            const searchTerm = filter.toLowerCase();
            items = items.filter((album) =>
                album.name.toLowerCase().includes(searchTerm) ||
                album.artist.toLowerCase().includes(searchTerm)
            );
        }

        // Apply sort if selected
        if (sortOption) {
            switch(sortOption) {
                case "albumAsc":
                    items = items.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                
                case "albumDesc":
                    items = items.sort((a, b) => b.name.localeCompare(a.name));
                    break;

                case "artistAsc":
                    items = items.sort((a, b) => {
                        const artistA = a.artist.replace(/^the\s+/i, '').trim();
                        const artistB = b.artist.replace(/^the\s+/i, '').trim();
                        return artistA.localeCompare(artistB);
                    });
                    break;

                case "artistDesc":
                    items = items.sort((a, b) => {
                        const artistA = a.artist.replace(/^the\s+/i, '').trim();
                        const artistB = b.artist.replace(/^the\s+/i, '').trim();
                        return artistB.localeCompare(artistA);
                    });
                    break;

                default:
                    // No sorting
                    break;
            }
        }

        return items;
    }, [wishlistItems, filter, sortOption]);

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    return (
        <div>
            <Head title="My Wishlist" />
            <div className="container mx-auto p-6 bg-neutral-950 text-gray-300 min-h-screen pt-20 min-w-full">
                <h1 className="text-5xl  mb-12 font-header md:text-center">My Wishlist</h1>

                
                {!auth.user ? (
                    <p className='font-mono min-h-screen'>Please <Link href='/register' className='underline text-indigo-600'>create an account</Link> or <Link href='/login' className='underline text-indigo-600'>log in</Link> to create a record wishlist!
                    </p>
                ) : (
                    <>
                    <div className="mb-8 font-mono max-w-lg text-center mx-auto">
                    <h4 className="text-2xl font-semibold mb-4">Sort Wishlist</h4>

                    <p className="py-2">By default your list will be sorted by the date you added the album to it</p>

                    <SortSelect 
                        options={sortOptions}
                        value={sortOption}
                        onChange={handleSort}
                    />

                    <div className="mt-4">
                        <input
                            type="text"
                            value={filter}
                            onChange={searchFilter}
                            placeholder="Search Wishlist..."
                            className="w-full p-2 border border-indigo-600 rounded bg-neutral-950 text-gray-200"
                        />
                    </div>
                </div>
                
                    {filteredAndSortedItems.length === 0 ? (
                        <p className='font-mono text-red-600'>Your wishlist is empty</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-neutral-950">
                            {filteredAndSortedItems.map((album) => (
                                <div 
                                key={album.album_id} 
                                className="bg-neutral-950 shadow-md rounded-lg p-4 border border-indigo-700"
                            >
                                <h2 className="text-xl font-semibold">{album.name}</h2>
                                <p className="text-gray-500 mt-2 mb-2">{album.artist}</p>
                            
                                <div className="flex justify-between gap-4">
                            
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
                )}

                <Footer />
            </div>
        </div>
    );
};

Wishlist.layout = (page: React.ReactNode) => <Header children={page} />;

export default Wishlist;