import axios from 'axios';

export const searchDiscogs = async (query: string) => {
    const response = await axios.get('/api/discogs/search', {
        params: {
            query
        }
    });
    return response.data;
};