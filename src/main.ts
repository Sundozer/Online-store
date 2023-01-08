import data from './data';
import { IFilteredData } from './interfaces';
import { sortDate } from './sort';

const mainContainerCards = document.querySelector('.main-container-cards');

function addBlockCard(framesСard: HTMLElement) {
  const block = document.createElement('div');
  framesСard.append(block);
  block.classList.add('block');
  return block;
}

function addButtonCard(framesСard: HTMLElement, textButton: string) {
  const btn = document.createElement('button');
  framesСard.append(btn);
  btn.classList.add('buttons');
  btn.classList.add('buttons-card');
  btn.textContent = `${textButton}`;
}

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

function addDescriptionCard(key: number, framesСard: HTMLElement, objectCardsFilter: IFilteredData[]) {
  if (localStorage.getItem('selectedSize') === 'big') {
    const descriptionCard = document.createElement('div');
    framesСard.append(descriptionCard);
    descriptionCard.classList.add('description-card');
    const descriptionCard1 = document.createElement('div');
    descriptionCard.append(descriptionCard1);
    descriptionCard1.textContent = `Category: ${objectCardsFilter[key].category}`;
    const descriptionCard2 = document.createElement('div');
    descriptionCard.append(descriptionCard2);
    descriptionCard2.textContent = `Brand: ${objectCardsFilter[key].brand}`;
    const descriptionCard3 = document.createElement('div');
    descriptionCard.append(descriptionCard3);
    descriptionCard3.textContent = `Price: ${objectCardsFilter[key].price}`;
    const descriptionCard4 = document.createElement('div');
    descriptionCard.append(descriptionCard4);
    descriptionCard4.textContent = `Discount: ${objectCardsFilter[key].discountPercentage}`;
    const descriptionCard5 = document.createElement('div');
    descriptionCard.append(descriptionCard5);
    descriptionCard5.textContent = `Rating: ${objectCardsFilter[key].rating}`;
    const descriptionCard6 = document.createElement('div');
    descriptionCard.append(descriptionCard6);
    descriptionCard6.textContent = `Stock: ${objectCardsFilter[key].stock}`;
  }
}

function createCardProduct(key: number, pmainContainerCards:Element, objectCardsFilter: IFilteredData[]) {
  const framesСard = document.createElement('div');
  if (localStorage.getItem('selectedSize') === 'big') {
    framesСard.classList.remove('frames-card-mini');
    framesСard.classList.add('frames-card');
  } else {
    framesСard.classList.remove('frames-card');
    framesСard.classList.add('frames-card-mini');
  }
  pmainContainerCards.append(framesСard);
  addBackgroundImg(key, framesСard, objectCardsFilter);
  addHeaderCard(key, framesСard, objectCardsFilter);
  addDescriptionCard(key, framesСard, objectCardsFilter);
  const block = addBlockCard(framesСard);
  addButtonCard(block, 'ADD TO CART');
  addButtonCard(block, 'DETAILS');
}

export function createCardsProduct(objectCardsFilter: IFilteredData[]) {
  // sortDatePriceASC(objectCardsFilter);
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
