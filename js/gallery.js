const images = [
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
        description: "Hokkaido Flower",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
        description: "Container Haulage Freight",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
        description: "Aerial Beach View",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
        description: "Flower Blooms",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
        description: "Alpine Mountains",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
        description: "Mountain Lake Sailing",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
        description: "Alpine Spring Meadows",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
        description: "Nature Landscape",
    },
    {
        preview:
            "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
        original:
            "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
        description: "Lighthouse Coast Sea",
    },
];

const gallery = document.querySelector(".gallery");
let currentImageInstance = null;

const applyGalleryStyles = (gallery) => {
  Object.assign(gallery.style, {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "24px",
      listStyle: "none",
  });
};

const createImageMarkup = ({ preview, original, description }) => {
    return `
      <li class="gallery-item" style="flex: 1 0 calc((100% - 48px) / 3);">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            style="width: 360px; height: 200px;"
          />
        </a>
      </li>`;
};

const renderGallery = (images) => {
    const markup = images.map(createImageMarkup).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
};

const openImageModal = (event) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
        return;
    }

    console.log(event.target.currentSrc);

    const modal = basicLightbox.create(
        `<div class="modal">
            <img
                class="gallery-image"
                src="${event.target.dataset.source}"
                data-source="${event.target.currentSrc}"
                alt="${event.target.alt}"
            />
        </div>`
    );

    modal.show();
    currentImageInstance = modal;

    document.addEventListener("keydown", handleModalCloseWithEscape);
};

const handleModalCloseWithEscape = (event) => {
    if (event.key === "Escape" && currentImageInstance?.visible()) {
        currentImageInstance.close();
        currentImageInstance = null;
        document.removeEventListener("keydown", handleModalCloseWithEscape);
    }
};

const initGallery = () => {
    applyGalleryStyles(gallery);
    renderGallery(images);
    gallery.addEventListener("click", openImageModal);
};

initGallery();