import data from './data';

const mainContainerCards = document.querySelector('.main-container-cards');


export function createCardsProduct() {
    if (mainContainerCards !== null) {
      for (const key in data.products) {
        // let keys:string = key;
        if (Object.prototype.hasOwnProperty.call(data.products, key)) {
          createCardProduct(+key, mainContainerCards);
        }
      }
    }
  }

function createCardProduct(key: number, mainContainerCards:Element) {
  const framesСard = document.createElement('div');
  framesСard.classList.add('frames-card');
  mainContainerCards.append(framesСard);
  addBackgroundImg(key,framesСard);
  addHeaderCard(key,framesСard);
  addDescriptionCard(key,framesСard);
}

function addBackgroundImg(key: number,framesСard: HTMLElement){
  framesСard.style.background = `url(${data.products[key].images[0]})`;
  framesСard.style.backgroundRepeat = "no-repeat";
  framesСard.style.backgroundSize = "cover";
}
function addHeaderCard(key: number,framesСard: HTMLElement){
  const headerСard = document.createElement('div');
  framesСard.append(headerСard);
  headerСard.classList.add('header-card');
  headerСard.textContent = data.products[key].title;
}
function addDescriptionCard(key: number,framesСard: HTMLElement){
  const descriptionCard = document.createElement('div');
  framesСard.append(descriptionCard);
  descriptionCard.classList.add('description-card');
  
}


