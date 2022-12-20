import data from './data';
import { IFilteredData } from './interfaces';

const mainContainerCards = document.querySelector('.main-container-cards');

function addBackgroundImg(key: number, framesСard: HTMLElement, objectCardsFilter: IFilteredData[]) {
  framesСard.style.background = `url(${objectCardsFilter[key].images[0]})`;
  framesСard.style.backgroundRepeat = 'no-repeat';
  framesСard.style.backgroundSize = 'cover';
}

function addHeaderCard(key: number, framesСard: HTMLElement, objectCardsFilter: IFilteredData[]) {
  const headerСard = document.createElement('div');
  framesСard.append(headerСard);
  headerСard.classList.add('header-card');
  headerСard.textContent = objectCardsFilter[key].title;
}

function addDescriptionCard(key: number, framesСard: HTMLElement) {
  const descriptionCard = document.createElement('div');
  framesСard.append(descriptionCard);
  descriptionCard.classList.add('description-card');
}

function createCardProduct(key: number, pmainContainerCards:Element, objectCardsFilter: IFilteredData[]) {
  const framesСard = document.createElement('div');
  framesСard.classList.add('frames-card');
  pmainContainerCards.append(framesСard);
  addBackgroundImg(key, framesСard, objectCardsFilter);
  addHeaderCard(key, framesСard, objectCardsFilter);
  addDescriptionCard(key, framesСard);
}

export function createCardsProduct(objectCardsFilter: IFilteredData[]) {
  if (mainContainerCards !== null) {
    Object.keys(objectCardsFilter).forEach((key) => {
      createCardProduct(+key, mainContainerCards, objectCardsFilter);
    });
  }
}

export function deleteCardsProduct() {
  if (mainContainerCards !== null) {
    mainContainerCards.replaceChildren();
  }
}
