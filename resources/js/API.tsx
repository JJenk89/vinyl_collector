import axios from 'axios';

export const searchDiscogs = async (query: string, page: number = 1, perPage: number = 6) => {
    const response = await axios.get(`api/discogs/search`, {
        params: {
            query,
            page,
            per_page: perPage,
            format: 'vinyl'
        }
    });
    return response.data;
};

export const getAlbumDetails = async (releaseId: string) => {
    const response = await axios.get(`/api/discogs/release/${releaseId}`);
    return response.data;
};