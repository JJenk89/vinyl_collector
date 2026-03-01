import { useState, useMemo, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Header from '@/Layouts/Header';

// Component imports
import Footer from '@/Components/Footer';
import SortSelect from '@/Components/SortList';
import MiniNav from '@/Components/MiniNav';
import AuthPromptPage from '@/Components/AuthPromptPage';
import SearchBar from '@/Components/SearchBar';
import AlbumCard, { Album } from '@/Components/AlbumCard';

type CollectionProps = {
    collections: Album[];
};

const Collection = ({ collections }: CollectionProps) => {
    const [collectionItems, setCollectionItems] = useState<Album[]>(collections);
    const [sortOption, setSortOption] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [dialogAlbumId, setDialogAlbumId] = useState<number | null>(null);

    useEffect(() => {
        setCollectionItems(collections);
    }, [collections]);

    const sortOptions = [
        { value: 'albumAsc', label: 'Album Name (A to Z)' },
        { value: 'albumDesc', label: 'Album Name (Z to A)' },
        { value: 'artistAsc', label: 'Artist Name (A to Z)' },
        { value: 'artistDesc', label: 'Artist Name (Z to A)' }
    ];

    const showDeleteDialog = (album: Album) => {
        const dialog = document.getElementById(`delete-dialog-${album.album_id}`);
        if (dialog) {
            (dialog as any).showModal();
        }
        setDialogAlbumId(album.album_id);
        
    };

    const closeDeleteDialog = (album: Album) => {
        const dialog = document.getElementById(`delete-dialog-${album.album_id}`);
        if (dialog) {
            (dialog as any).close();
        }
        setDialogAlbumId(null);
    };

    const handleRemoveFromCollection = (album: any) => {
        router.delete('/collection/remove', {
            data: { album_id: album.album_id },
            onSuccess: () => {
                setCollectionItems((prev) => prev.filter((a) => a.album_id !== album.album_id));
                setDialogAlbumId(null);
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
        // Start with the complete collectionItems
        let items = [...collectionItems];

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
    }, [collectionItems, filter, sortOption]);

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    return (
        <div>
            <Head title="My Collection" />
            <div className="container mx-auto min-w-full p-6 bg-neutral-950 text-gray-300 min-h-screen pt-20">
                <MiniNav />
                <h1 className="text-5xl  mb-12 font-header md:text-center">My Collection</h1>

                
                {!auth.user ? (
                    <AuthPromptPage
                        listType="collection"
                    />
                ) : (
                    <>
                    <div className="mb-8 font-mono max-w-lg text-center mx-auto">
                    <h4 className="text-2xl font-semibold mb-4">Sort Collection</h4>

                    <p className="py-2">By default your list will be sorted by the date you added the album to it</p>

                    <SortSelect 
                        options={sortOptions}
                        value={sortOption}
                        onChange={handleSort}
                    />

                    <SearchBar
                        filter={filter}
                        searchFilter={searchFilter}
                        searchType="collection"
                    />
                </div>
                
                    {filteredAndSortedItems.length === 0 ? (
                        <p className='font-mono text-red-600'>Your collection is empty</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-neutral-950 font-mono"
                        >
                            {filteredAndSortedItems.map((album) => (
                                <AlbumCard
                                    key={album.album_id}
                                    album={album}
                                    dialogAlbumId={dialogAlbumId}
                                    context="collection"
                                    onShowDeleteDialog={showDeleteDialog}
                                    onCloseDeleteDialog={closeDeleteDialog}
                                    onDelete={handleRemoveFromCollection}
                                /> 
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

Collection.layout = (page: React.ReactNode) => <Header children={page} />;

export default Collection;