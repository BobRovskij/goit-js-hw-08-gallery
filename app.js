const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const galleryElements = document.querySelector(".js-gallery");

const ref = {
  openModal: document.querySelector('.js-lightbox'),
  btnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
  imposeOverlay: document.querySelector('.lightbox__overlay'),
  originalImg: document.querySelector('.lightbox__image'),
};

const arrLinks = [];
galleryItems.forEach(item => arrLinks.push(item.original));

function createGalleryEl (items) {
return items.map(({ preview, original, description}) => 
`<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
).join('');
};

galleryElements.innerHTML = createGalleryEl(galleryItems);
galleryElements.addEventListener('click', clickOnImg);
 function clickOnImg (event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  } else {
    event.preventDefault();
    ref.openModal.classList.add('is-open');
    ref.originalImg.src = event.target.dataset.source;
    ref.originalImg.alt = event.target.alt;

    eventListenerAdds();
  };
};

const eventListenerAdds = function () {
  document.addEventListener('keydown', closeModalByEsc);
  document.addEventListener('keydown', switchImages);
  ref.btnCloseModal.addEventListener('click', closeModalByBtn);
  ref.imposeOverlay.addEventListener('click', closeModalByOvelayClick);
};

const eventListenerRemoves = function () {
  ref.btnCloseModal.removeEventListener('click', closeModalByBtn);
  ref.imposeOverlay.removeEventListener('click', closeModalByOvelayClick);  
  document.removeEventListener('keydown', closeModalByEsc);
  document.removeEventListener('keydown', switchImages);
};

function closeModalByBtn () {
  ref.openModal.classList.remove('is-open');

  eventListenerRemoves();
};

function closeModalByOvelayClick () {
  ref.openModal.classList.remove('is-open');
  
  eventListenerRemoves();
};

function closeModalByEsc (evt) {
  if (ref.openModal.classList.contains('is-open')) {
    if(evt.code === 'Escape') {
      ref.openModal.classList.remove('is-open');
      ref.originalImg.src = '';
      ref.originalImg.alt = '';
      
      eventListenerRemoves();
    };
  };
};

function switchImages (evt) {
  let newId;
  const currentId = arrLinks.indexOf(ref.originalImg.src);
  if (evt.key === 'ArrowLeft') {
    newId = currentId - 1;
    if (newId === -1) {
      newId = arrLinks.length - 1;
    };
  } else if (evt.key === 'ArrowRight') {
    newId = currentId + 1;
    if (newId === arrLinks.length) {
      newId = 0;
    } 
  } else {
    return;
  };
  ref.originalImg.src = arrLinks[newId];
};