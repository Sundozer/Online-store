import { IFilteredData } from './interfaces';
import { createCardsProduct, deleteCardsProduct } from './main';

export function createDetailedCard(obj: IFilteredData) {

  // const container = document.querySelector('.container') as HTMLElement;  
  // const img = document.createElement('img');
  // const detailedCart = document.createElement('div');
  const detailedCard = document.querySelector('.detailed-card') as HTMLElement;
  detailedCard.style.display = 'block';
  deleteCardsProduct(detailedCard);
  createCardsProduct([obj], detailedCard);
  // const innerDiv = document.createElement('div');
  // const productTitle = document.createElement('p');
  // const productDesc = document.createElement('p');
  // const productCost = document.createElement('div');
  // const delButton = document.createElement('button');
  // central.style.display = 'block';
  // container.append(detailedCart);
  // detailedCart.classList.add('card');
  // innerDiv.classList.add('product-description');
  // img.classList.add('back-img');
  // productTitle.classList.add('product-title');
  // productDesc.classList.add('product-desc');
  // div.append(img);
  // img.src = `${obj.images[0]}`;
  // div.append(innerDiv);
  // div.append(productCost);
  // innerDiv.append(productTitle);
  // innerDiv.append(productDesc);
  // productTitle.innerHTML = `${obj.title}`;
  // productDesc.innerHTML = `${obj.description}`;
  // productCost.innerHTML = `<p>${obj.price}$</p><button class="del-button">Del</button>`;
}