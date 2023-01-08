import { IFilteredData } from './interfaces';

export function createDetailedCard(obj: IFilteredData) {

  const central = document.querySelector('.central') as HTMLElement;  
  // const img = document.createElement('img');
  const detailedCart = document.createElement('div');
  // const innerDiv = document.createElement('div');
  // const productTitle = document.createElement('p');
  // const productDesc = document.createElement('p');
  // const productCost = document.createElement('div');
  // const delButton = document.createElement('button');
  // central.style.display = 'block';
  central.append(detailedCart);
  detailedCart.classList.add('card');
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