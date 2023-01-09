import { IFilteredData } from './interfaces';
import { createCardsProduct, deleteCardsProduct } from './main';

function addImgDetailedCard(arrayImgs: string[], pproductImgs:Element, pobj: IFilteredData) {
  for (let i = 0; i < arrayImgs.length; i++) {
    const productImg = document.createElement('div');
    pproductImgs.append(productImg);
    productImg.classList.add('productImg');
    productImg.style.background = `url(${pobj.images[i]})`;
    productImg.style.backgroundRepeat = 'no-repeat';
    productImg.style.backgroundSize = 'cover';
  }
}

export function createDetailedCard(obj: IFilteredData) {
  const detailedCard = document.querySelector('.detailed-card') as HTMLElement;
  detailedCard.style.display = 'flex';
  deleteCardsProduct(detailedCard);
  createCardsProduct([obj], detailedCard);  
  const productImgs = document.createElement('div');
  detailedCard.append(productImgs);
  productImgs.classList.add('productImgs');
  addImgDetailedCard(obj.images, productImgs, obj);

}