import axios from 'axios';

export const getToken = async () => {
    return await axios('https://accounts.spotify.com/api/token'), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    }};