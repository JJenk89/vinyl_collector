import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Layouts/Header';

type Album = {
    id: number;
    name: string;
    artist: string;
};

type CollectionProps = {
    collections: Album[];
};

const Collection = ({ collections }: CollectionProps) => {
    return (
        <div>
            <Head title="My Collection" />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">My Collection</h1>
                
                {collections.length === 0 ? (
                    <p>Your collection is empty</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {collections.map((album) => (
                            <div 
                                key={album.id} 
                                className="bg-white shadow-md rounded-lg p-4"
                            >
                                <h2 className="text-xl font-semibold">{album.name}</h2>
                                <p className="text-gray-600">{album.artist}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

Collection.layout = (page: React.ReactNode) => <Header children={page} />;

export default Collection;
