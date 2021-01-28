import galleryItems from './gallery-items.js';

// ссылки на елементы DOM

const refs = {
  gallery: document.querySelector('.gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
};

// слушатели фобытий

refs.gallery.addEventListener('click', openModalWindow);
refs.closeModalBtn.addEventListener('click', closeModalWindow);
window.addEventListener('keydown', closeModalWindowOnEsc);
refs.overlay.addEventListener('click', closeModalWindowOnOverlay);

// функция, которая принимает обьект и выдеат разметку для вставки картинок

const createGalleryItem = ({ preview, original, description }) => {
  const galleryList = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImg = document.createElement('img');

  galleryList.classList.add('gallery__item');
  galleryLink.classList.add('gallery__link');
  galleryImg.classList.add('gallery__image');

  galleryImg.src = preview;
  galleryImg.dataset.source = original;
  galleryImg.alt = description;

  galleryLink.appendChild(galleryImg);
  galleryList.appendChild(galleryLink);

  refs.gallery.appendChild(galleryList);

  return galleryList;
};

// функция для создания галлереи

function makeGallery(array) {
  const newGalleryArr = array.map(image => createGalleryItem(image));
  refs.gallery.append(...newGalleryArr);
}
makeGallery(galleryItems);

// функция для открытия модалки по клику на картинку галереи

function openModalWindow(event) {
  if (!event.target.classList.contains('gallery__image')) return;

  refs.lightbox.classList.add('is-open');
  const urlBigImg = event.target.dataset.source;
  const altBigImg = event.target.alt;

  refs.lightboxImage.src = urlBigImg;
  refs.lightboxImage.alt = altBigImg;

  // слушатель события нажатия вправо-влево на клавиатуре
  window.addEventListener('keydown', arrowImagesSwitch);
}

// функция для закрытия модалки

function closeModalWindow() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
}
// функция для закрытия модалки по Esc

function closeModalWindowOnEsc(event) {
  if (event.code === 'Escape') {
    closeModalWindow();
  }
}

// функция для закрытия модалки по клику на бэкдроп

function closeModalWindowOnOverlay(event) {
  if (!event.target.classList.contains('lightbox__overlay')) return;
  closeModalWindow();
}

// функция для пролистования картинок при нажатии вправо-влево на клавиатуре с открым модальным окном

function arrowImagesSwitch(event) {
  const imagesSrcArray = galleryItems.map(image => image.original);
  const indexOfCurrentImg = imagesSrcArray.indexOf(refs.lightboxImage.src);

  if (event.code === 'ArrowRight') {
    if (indexOfCurrentImg < imagesSrcArray.length - 1)
      refs.lightboxImage.src = imagesSrcArray[Number(indexOfCurrentImg) + 1];
  }

  if (event.code === 'ArrowLeft') {
    if (indexOfCurrentImg > 0) {
      refs.lightboxImage.src = imagesSrcArray[Number(indexOfCurrentImg) - 1];
    }
  }
}
