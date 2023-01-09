import { IFilteredData } from './interfaces';
import { createCardsProduct, deleteCardsProduct } from './main';
import {setRouteDetails} from './route'

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
  const firstImg = productImgs.firstChild as HTMLElement;
  firstImg.classList.add('productImg-big');
  // productImgs.firstChild.classList.add('productImg-big');
  // debugger;
  setRouteDetails(obj)
}
