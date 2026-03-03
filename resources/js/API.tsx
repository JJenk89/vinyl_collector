import axios from 'axios';

export const searchDiscogs = async (query: string) => {
    const response = await axios.get('/api/discogs/search', {
        params: {
            query
        }
    });
    return response.data;
};

export const getAlbumDetails = async (releaseId: string) => {
    const response = await axios.get(`/api/discogs/release/${releaseId}`);
    return response.data;
};