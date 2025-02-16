import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

const useSpotifyToken = () => {
    const [token, setToken] = useState('');
    const [expiry, setExpiry] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    useEffect (() => {

        if (!auth.user) return;
        
        const fetchToken = async () => {
            try {
                const response = await axios.post('/api/spotify/token', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const newToken = response.data.access_token;
                const newExpiry = Date.now() + 3600 * 1000; // 1 hour
                setToken(newToken);
                setExpiry(newExpiry);
                localStorage.setItem('spotify_token', newToken);
                localStorage.setItem('spotify_expiry', newExpiry.toString());
                console.log("Full response:", response.data)
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        //token validation check
        const storedToken = localStorage.getItem('spotify_token');
        const storedExpiry = localStorage.getItem('spotify_expiry');
        const currentTime = Date.now();

        if (storedToken && storedExpiry && currentTime < parseInt(storedExpiry)) {
            setToken(storedToken);
            setExpiry(parseInt(storedExpiry));
            setLoading(false);
        } else {
            fetchToken();
            setLoading(true);
        }

    }, [expiry]);

    

    return { token, loading, error };
}
 
export default useSpotifyToken;