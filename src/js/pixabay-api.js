import axios from 'axios';

const URL = "https://pixabay.com/api/";
const API_KEY = "45091921-bafbe55c990439d7032dec8c8";

const perPage = 15;
const LIM = 20;

export async function searchGalleryQuery(query, page) {
    try {
        const response = await axios.get(URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                _limit: LIM,
                per_page: perPage
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }

}