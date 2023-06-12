import { handleSubmit } from './handleSubmit';
import { refs } from './refs';

export function renderMarking(e) {
  const markup = e
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  
 <a href="${largeImageURL}"><img class="photo" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy"/></a>

  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

  var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
