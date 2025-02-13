import { useState, useEffect, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import axios from 'axios';

interface SpotifyItem {
    id: string;
    name: string;
    images: { url: string }[];
    type: string;
    artists: string;
}
interface User {
    id: number;
    name: string;
    email: string;
}

function Search() {
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    const [results, setResults] = useState<SpotifyItem[]>([]);


    useEffect(() => {
        axios.post('/api/spotify/token')    // This is the route we defined in routes/api.php
                                            // It will return a Spotify token
            .then(res => {
                console.log("Full response:", res.data);
                setToken(res.data.access_token);
            })
            .catch(error => {
                console.error('Error fetching Spotify token:', error);
            });
    }, []);

    const searchSpotify = () => {
        if (!search.trim()) return;
    if (!token) {
        console.log('Token is empty, returning early');
        return;
    }

    axios.get('/api/spotify/search', {
        params: {
            query: search.trim(),
            type: 'album,artist',
        }
    })
    .then(res => {
        let data = res.data;
        console.log(res.data);
    
        const albumResults = data.albums?.items || [];
        const artistResults = data.artists?.items || [];
    
        setResults([...albumResults, ...artistResults]);
    })
    .catch(error => {
        console.error("Full error object:", error);
    });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchSpotify();
        }
    };

    return (
        <div>
                <div className="p-4 text-center">
                    <h1 className='text-4xl font-black'>Search For An Album</h1>
                </div>
            
            <div className=" p-2 m-2">
                <form role="search" onSubmit={(e) => {
                    e.preventDefault();
                    searchSpotify();
                    }}>

                    <label htmlFor="searchbar" className="block mb-2">
                        Search for an album
                    </label>
                        <div className="flex">
                            <input 
                                type="search"
                                id="searchbar"
                                name="searchbar"
                                placeholder="Search by artist name or album"
                                value={search}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                aria-label="Search Spotify by album or artist name"
                                className="w-2/3 p-2 border rounded"
                            />

                            <button 
                              type="submit" 
                              className="p-2 bg-blue-950 text-white rounded"
                              aria-label="Perform search"
                            > Search
                            </button>
                        </div>
                    </form>
            </div>
            
            {/* SEARCH RESULTS */}

            <h2 className="p-4 text-2xl">Search Results</h2>

            <div className="grid grid-cols-2 grid-rows-4 gap-4 border-4">
                {results.map((item, index) => (
                    <div key={index} className="p-4 border">
                        <h3>{item.name}</h3>
                        {item.images && item.images.length > 0 && (
                            <Link href={`/album/${item.id}`}><img src={item.images[0].url} alt={item.name} className="w-full h-auto" /></Link>
                        )}
                        <p>{item.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

Search.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Search;