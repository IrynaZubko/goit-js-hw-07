import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
let modalWindow = ``;

galleryEl.insertAdjacentHTML('beforeend', createGallery(galleryItems));

galleryEl.addEventListener('click', onOpenModal);

function createGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
      `
    }).join('');
}

function onOpenModal(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const originalImage = event.target.dataset.source;

  modalWindow = basicLightbox.create(
    `<img src="${originalImage}" width="800" height="600">`
  );

  modalWindow.show(() => {
    window.addEventListener('keydown', onEscKeyPress);
    window.addEventListener('click', onCloseModal);
  });
}

function onCloseModal() {
  window.removeEventListener('click', onCloseModal);
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    modalWindow.close(() => window.removeEventListener('keydown', onEscKeyPress));
  }
}