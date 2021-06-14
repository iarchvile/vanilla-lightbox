import Gallery from "./modules/gallery";
import Single from "./modules/single";
import Iframe from "./modules/iframe";

export default class VanillaLightbox{
    constructor() {
        this.lightboxId = 1;
        this.gallery = new Gallery();
        this.single = new Single();
        this.iframe = new Iframe();
        this.init();

        //on overlay click close lightbox
        let overlays = document.querySelectorAll('.vanilla-lightbox-overlay');

        if(overlays){
            for(let i = 0; i < overlays.length; i++){
                overlays[i].addEventListener('click', () => {
                    this.closeLightbox(overlays[i].parentNode);
                })
            }
        }

        //on exit click close lightbox
        let exits = document.querySelectorAll('.vanilla-lightbox .exit');

        if(exits){
            for(let i = 0; i < exits.length; i++){
                exits[i].addEventListener('click', () => {
                    this.closeLightbox(exits[i].parentNode);
                })
            }
        }
    }

    init(){
        //getting all lighboxes in that page
        const lightboxes = document.querySelectorAll('.lightbox');

        //checking if it is single or gallery
        if(lightboxes){
            for(let i = 0; i < lightboxes.length; i++){
                let galleryId = this.lightboxId;
                this.generateLightboxDom(galleryId);
                if(lightboxes[i].childElementCount > 1){
                    this.gallery.initGallery(lightboxes[i],galleryId);
                }else if(lightboxes[i].classList.contains('iframe')){
                    this.iframe.init(lightboxes[i].querySelector('a'),galleryId);
                }else{
                    this.single.initSingle(lightboxes[i].querySelector('a'),galleryId);
                }
            }
        }
    }

    generateLightboxDom(id){
        let lightboxElement = document.createElement('div');
        lightboxElement.classList.add('vanilla-lightbox');
        lightboxElement.classList.add(`vanilla-lightbox-${id}`);

        let exit = document.createElement('div');
        exit.classList.add('exit');
        lightboxElement.insertBefore(exit, lightboxElement.childNodes[0]);

        let lightboxOverlay = document.createElement('div');
        lightboxOverlay.classList.add('vanilla-lightbox-overlay');

        lightboxElement.appendChild(lightboxOverlay);
        document.body.appendChild(lightboxElement);
        this.lightboxId++;
    }

    closeLightbox(element){
        element.classList.remove('show');
        let iframe = element.querySelector('iframe')
        if(iframe){
            iframe.src = iframe.getAttribute('src');
        }
    }
}
