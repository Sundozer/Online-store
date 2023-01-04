import { IFilteredData } from './interfaces';

export function clearProducts() {
  const products = document.querySelector('.products-list') as HTMLElement;
  products.replaceChildren();
}

export function placeToCart(obj: IFilteredData) {
  const products = document.querySelector('.products-list') as HTMLElement;
  const img = document.createElement('img');
  const div = document.createElement('div');
  const innerDiv = document.createElement('div');
  const productTitle = document.createElement('p');
  const productDesc = document.createElement('p');
  products.append(div);
  div.classList.add('one-of-items');
  innerDiv.classList.add('product-description');
  img.classList.add('back-img');
  productTitle.classList.add('product-title');
  productDesc.classList.add('product-desc');
  div.append(img)
  img.src = `${obj.images[0]}`
  div.append(innerDiv)
  innerDiv.append(productTitle)
  innerDiv.append(productDesc)
  productTitle.innerHTML = `${obj.title}`
  productDesc.innerHTML = `${obj.description}`





  

}

export function clearButtonCart() {
  localStorage.removeItem('shoppingList');
  localStorage.removeItem('summaryPrice');
  document.querySelector('.total-price')!.innerHTML = 'Cart total: 0';
  document.querySelector('.total-in-block')!.innerHTML = 'Total: 0';
  document.querySelector('.basket')!.innerHTML = 'Cart';
  document.querySelector('.products-in-block')!.innerHTML = 'Products: 0';
  clearProducts();
}
