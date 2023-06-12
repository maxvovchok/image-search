import { refs } from './refs';
import { renderMarking } from './renderMarking';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

axios.defaults.baseURL = `https://pixabay.com/api/?37154597-63d1fb6dbcb2f64553a93c693)}`;

let pageToFetch = 1;
let queryToFetch = '';
refs.btnLoadMore.hidden = true;

export function handleSubmit(e) {
  e.preventDefault();

  const inputValue = refs.inputEl.value;

  if (!inputValue || inputValue === queryToFetch) {
    return;
  }
  queryToFetch = inputValue;
  pageToFetch = 1;
  refs.galleryEl.innerHTML = '';
  getEvents(queryToFetch, pageToFetch);

  refs.btnLoadMore.hidden = false;
}

function checkingLengthArray({ hits, totalHits }) {
  if (hits.length === 0) {
    Notiflix.Notify.failure(
      '❌ Sorry, there are no images matching your search query. Please try again.'
    );
    refs.btnLoadMore.hidden = true;
  } else if (hits.length < 20) {
    refs.btnLoadMore.hidden = true;
  }

  renderMarking(hits);

  if (pageToFetch === 1 && hits.length > 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}

async function getEvents(query, page) {
  await fetchEvents(query, page)
    .then(data => checkingLengthArray(data))
    .catch(error => console.log(error));
}

async function fetchEvents(keyword, page) {
  try {
    const { data } = await axios('events.json', {
      params: {
        key: '37154597-63d1fb6dbcb2f64553a93c693',
        q: keyword,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

refs.btnLoadMore.addEventListener('click', handleLoadMore);

function handleLoadMore() {
  pageToFetch += 1;
  getEvents(queryToFetch, pageToFetch);
}
