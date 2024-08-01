// main.js
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { searchGalleryQuery } from "./js/pixabay-api";
import { createImages, clearImages } from "./js/render-functions";

const form = document.querySelector('.form-gallery');
const input = document.querySelector('.form-gallery-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let searchWord = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', handleSubmitBtn);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmitBtn(event) {
    event.preventDefault();
    clearImages();
    loadMoreBtn.classList.add('hidden');
    loader.classList.remove('hidden');

    searchWord = input.value.trim();
    page = 1;

    try {
        const data = await searchGalleryQuery(searchWord, page);
        if (data.total === 0 || searchWord === "") { 
            iziToast.error({
                position: 'topRight',
                message: "Sorry, there are no images matching your search query. Please try again!",
            });
        } else {
            createImages(data);
            totalHits = data.totalHits;
            if (data.hits.length > 0) {
                loadMoreBtn.classList.remove('hidden');
            }
        }
    } catch (error) {
        iziToast.error({
            position: 'topRight',
            message: "Error fetching images. Please try again later.",
        });
    } finally {
        loader.classList.add('hidden');
    }

    form.reset();
}

async function handleLoadMore() {
    page += 1;
    loader.classList.remove('hidden');
    loadMoreBtn.classList.add('hidden');

    try {
        const data = await searchGalleryQuery(searchWord, page);
        createImages(data);

        if (page * 15 >= totalHits) {
            loadMoreBtn.classList.add('hidden');
            iziToast.info({
                position: 'topRight',
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            loadMoreBtn.classList.remove('hidden');
        }

        // Плавная прокрутка страницы
        const { height: cardHeight } = document
            .querySelector('.gallery-list')
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

    } catch (error) {
        iziToast.error({
            position: 'topRight',
            message: "Error loading more images. Please try again later.",
        });
    } finally {
        loader.classList.add('hidden');
    }
}
