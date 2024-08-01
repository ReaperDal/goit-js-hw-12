
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function createImages(data) {
    const lightbox = new SimpleLightbox('.gallery-list a', {
        captions: true,
        captionsData: 'alt',
        captionsDelay: 250
    });

    const galleryList = document.querySelector('.gallery-list');

    let images = data.hits.map((image) =>
        `<div class="image-wrapper">
    <a href="${image.largeImageURL}">
    <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}"></img>
    </a>
    <div class="text-wrapper">
    <div class="text-item"><h5 class="text-header">Likes</h5><p class="text-paragraph">${image.likes}</p></div>
    <div class="text-item"><h5 class="text-header">Views</h5><p class="text-paragraph">${image.views}</p></div>
    <div class="text-item"><h5 class="text-header">Comments</h5><p class="text-paragraph">${image.comments}</p></div>
    <div class="text-item"><h5 class="text-header">Downloads</h5><p class="text-paragraph">${image.downloads}</p></div>
    </div>
    </div>`).join("");
        
    galleryList.insertAdjacentHTML('beforeend', images);
    lightbox.refresh();
}

export function clearImages() {
    const galleryList = document.querySelector('.gallery-list');
    galleryList.innerHTML = "";
}