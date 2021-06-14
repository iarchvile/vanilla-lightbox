import Lazyload from "./lazyload";
import lazyload from "./lazyload";

import 'swiped-events';


export default class Gallery {

    initArrowEvents() {
        //on arrow click
        let arrows = document.querySelectorAll('.vanilla-lightbox .arrow');
        if (arrows) {
            for (let i = 0; i < arrows.length; i++) {
                arrows[i].addEventListener('click', () => {
                    this.nextPrevImage(arrows[i]);
                })
            }
        }
    }

    initGallery(elements, id) {
        const lightboxElement = document.querySelector(`.vanilla-lightbox-${id}`);
        this.generateGalleryDom(elements, id);
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('data-lightbox', id);
            elements[i].addEventListener('click', (e) => {
                e.preventDefault();
                lightboxElement.classList.add('show');
                this.openClickedImage(id, elements[i].getAttribute('data-image'));
            })
        }
    }

    generateGalleryDom(elements, id) {
        const lightboxElement = document.querySelector(`.vanilla-lightbox-${id}`);
        let galleryElement = document.createElement('div');
        galleryElement.classList.add('gallery');
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('data-image', i);
            const imageUrl = elements[i].getAttribute('href');

            let imageElement = document.createElement('img');

            imageElement.setAttribute('data-src', imageUrl);

            let imageParentElement = document.createElement('div');
            imageParentElement.classList.add('image');
            if (i === elements.length - 1) {
                imageParentElement.classList.add('last');
            }
            imageParentElement.setAttribute('data-image', i);
            imageParentElement.classList.add('hide');
            imageParentElement.appendChild(imageElement);

            galleryElement.appendChild(imageParentElement);
        }

        //add arrows
        let leftArrow = document.createElement('div');
        leftArrow.classList.add('arrow');
        leftArrow.classList.add('arrow-left');
        galleryElement.insertBefore(leftArrow, galleryElement.childNodes[0]);

        let rightArrow = document.createElement('div');
        rightArrow.classList.add('arrow');
        rightArrow.classList.add('arrow-right');
        galleryElement.appendChild(rightArrow);

        lightboxElement.appendChild(galleryElement);

        this.initArrowEvents();
    }


    openClickedImage(galleryId, id) {
        let
            allImages = document.querySelectorAll(`.vanilla-lightbox-${galleryId} .image`),
            arrows = document.querySelectorAll('.vanilla-lightbox .arrow'),
            $this = this;

        if (allImages) {
            for (let i = 0; i < allImages.length; i++) {

                allImages[i].addEventListener('click', function (e) {
                    $this.nextPrevImage(arrows[1]);
                });

                allImages[i].addEventListener('swiped', function (e) {
                    switch (e.detail.dir) {
                        case 'left':
                            $this.nextPrevImage(arrows[1]);
                            break;
                        case 'right':
                            $this.nextPrevImage(arrows[0]);
                            break;
                    }
                });

                allImages[i].classList.add('hide');
                if (allImages[i].getAttribute('data-image') === id) {
                    allImages[i].classList.remove('hide');
                    lazyload.initLazy(allImages[i]);
                }
            }
        }
    }

    nextPrevImage(arrow) {
        let openedLightbox = document.querySelector('.vanilla-lightbox.show');
        let openedImage = openedLightbox.querySelector('.image:not(.hide)');
        let allImages = openedLightbox.querySelectorAll('.image');
        let id = parseInt(openedImage.getAttribute('data-image'));
        let nextId, nextImage;

        if (arrow.classList.contains('arrow-left')) {
            nextId = id > 0 ? id - 1 : null;
            nextImage = openedLightbox.querySelector(`[data-image="${nextId}"]`);

            if (!nextImage) {
                nextImage = openedLightbox.querySelector('.image.last');
            }
        } else {
            nextId = (id > -1) ? id + 1 : 0;
            nextImage = openedLightbox.querySelector(`[data-image="${nextId}"]`);

            if (!nextImage) {
                nextImage = openedLightbox.querySelector(`[data-image="0"]`);
            }
        }
        if (nextImage) {
            if (allImages) {
                for (let i = 0; i < allImages.length; i++) {
                    allImages[i].classList.add('hide');
                }
            }

            lazyload.initLazy(nextImage);
            nextImage.classList.remove('hide');
        }
    }
}
