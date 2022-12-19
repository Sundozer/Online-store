import data from './data';

const mainContainerCards = document.querySelector('.main-container-cards');

function addBackgroundImg(key: number, framesСard: HTMLElement) {
  framesСard.style.background = `url(${data.products[key].images[0]})`;
  framesСard.style.backgroundRepeat = 'no-repeat';
  framesСard.style.backgroundSize = 'cover';
}

function addHeaderCard(key: number, framesСard: HTMLElement) {
  const headerСard = document.createElement('div');
  framesСard.append(headerСard);
  headerСard.classList.add('header-card');
  headerСard.textContent = data.products[key].title;
}

function addDescriptionCard(key: number, framesСard: HTMLElement) {
  const descriptionCard = document.createElement('div');
  framesСard.append(descriptionCard);
  descriptionCard.classList.add('description-card');
}

function createCardProduct(key: number, pmainContainerCards:Element) {
  const framesСard = document.createElement('div');
  framesСard.classList.add('frames-card');
  pmainContainerCards.append(framesСard);
  addBackgroundImg(key, framesСard);
  addHeaderCard(key, framesСard);
  addDescriptionCard(key, framesСard);
}
export function createCardsProduct(objectCardsFilter: object) {
  if (mainContainerCards !== null) {
        Object.keys(objectCardsFilter).forEach((key) => {
          createCardProduct(+key, mainContainerCards);
        });
      }
    }

export function deleteCardsProduct() {
  if (mainContainerCards !== null) {
    mainContainerCards.replaceChildren();
  }
}