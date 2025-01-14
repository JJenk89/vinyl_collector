import AlbumCard from "@/Components/AlbumCard";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import axios from 'axios';



export default function Welcome() {

    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        axios.post('/api/spotify/token')
            .then(res => {
                console.log("Full response:", res.data);  // Log the full response

                setToken(res.data.access_token);
            })
            .catch(error => {
                console.error('Error fetching Spotify token:', error);
            });
    }, []);
    
    return (
        <>
        <div className="flex-col bg-slate-300 min-h-screen p-4 text-center">

            <h1 className="text-4xl font-black">Vinyl App</h1>

            <Link href="/Collection" className="text-2xl underline text-blue-700">View Collection</Link>

            <div className="w-screen p-2 m-2">
                <input 
                type="search"
                placeholder="Search by artist name or album"
                onChange={(e) => setSearch(e.target.value.toLowerCase())
                }
                onKeyDown={e => {if (e.key === 'Enter') {
                    console.log(search);
                }}}
                className="w-2/3" />
            </div>

            <h2 className="p-4 text-2xl">Search Results</h2>

            <div className="grid grid-cols-2 grid-rows-4 gap-4 border-4">
                
            </div>

        </div>
        </>
    );
}

