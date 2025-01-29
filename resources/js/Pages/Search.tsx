import { useState, useEffect, ReactNode } from 'react';
import Header from '@/Layouts/Header';
import axios from 'axios';

function Search() {
    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');
    interface SpotifyItem {
        name: string;
        images: { url: string }[];
        type: string;
    }
    
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
        console.log('Current search value:', search);
    console.log('Current token:', token);

    if (!search.trim()) {
        console.log('Search is empty, returning early');
        return;
    }
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
        // Log the exact response from your backend
        console.log("Backend response:", res);
        console.log("Response data type:", typeof res.data);
        console.log("Response data keys:", Object.keys(res.data));
    
        // If the response is a string, try parsing it
        let data = res.data;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
                console.log("Parsed data:", data);
            } catch (e) {
                console.error("Failed to parse response:", e);
                return;
            }
        }
    
        const albumResults = data.albums?.items || [];
        const artistResults = data.artists?.items || [];
        
        console.log("Processed results:", {
            albumResults: albumResults.length,
            artistResults: artistResults.length
        });
    
        setResults([...albumResults, ...artistResults]);
    })
    .catch(error => {
        console.error("Full error object:", error);
    });
    };

    return (
        <div>
            <div className="p-4 text-center">
                <h1 className='text-4xl font-black'>Search For An Album</h1>
            </div>
            
            <div className="w-screen p-2 m-2">
                <input 
                    type="search"
                    placeholder="Search by artist name or album"
                    value={search}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setSearch(newValue);
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            searchSpotify();
                        }
                    }}
                    className="w-2/3" />
            </div>

            <h2 className="p-4 text-2xl">Search Results</h2>

            <div className="grid grid-cols-2 grid-rows-4 gap-4 border-4">
                {results.map((item, index) => (
                    <div key={index} className="p-4 border">
                        <h3>{item.name}</h3>
                        {item.images && item.images.length > 0 && (
                            <img src={item.images[0].url} alt={item.name} className="w-full h-auto" />
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