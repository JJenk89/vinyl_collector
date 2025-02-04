import React from 'react';
import Header from '@/Layouts/Header';

type Album = {
    id: number;
    name: string;
    artist: string;
};

type WishlistProps = {
    wishlist: Album[];
};

const Wishlist = ({ wishlist }: WishlistProps) => {
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

Wishlist.layout = (page: React.ReactNode) => <Header children={page} />;

export default Wishlist;