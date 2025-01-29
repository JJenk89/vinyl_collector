import { useState, useEffect, ReactNode } from 'react';
import Header from '@/Layouts/Header';
import { Link } from '@inertiajs/react';
import axios from 'axios';

function Search() {

    const [search, setSearch] = useState('');
    const [token, setToken] = useState('');

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

    return (
        
        <div>
            <div className="p-4 text-center">
                <h1 className='text-4xl font-black'>Search For An Album</h1>
            </div>
            
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
     );
}

Search.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Search;