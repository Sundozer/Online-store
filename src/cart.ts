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
  const productCost = document.createElement('div');
  const delButton = document.createElement('button');
  products.append(div);
  div.classList.add('one-of-items');
  innerDiv.classList.add('product-description');
  img.classList.add('back-img');
  productTitle.classList.add('product-title');
  productDesc.classList.add('product-desc');
  div.append(img);
  img.src = `${obj.images[0]}`;
  div.append(innerDiv);
  div.append(productCost);
  innerDiv.append(productTitle);
  innerDiv.append(productDesc);
  productTitle.innerHTML = `${obj.title}`;
  productDesc.innerHTML = `${obj.description}`;
  productCost.innerHTML = `<p>${obj.price}$</p><button class="del-button">Del</button>`;
}

export function showCart() {
  const central = document.querySelector('.central') as HTMLElement;
  const cart = document.querySelector('.cart') as HTMLElement;
  central.style.display = 'none';
  cart.style.display = 'block';
}

export function clearButtonCart() {
  /* eslint-disable-next-line */
  const ifConfirm = confirm('Clear cart?');
  if (ifConfirm === true) {
    /* eslint-disable-next-line */
    console.log(confirm);
    localStorage.removeItem('shoppingList');
    localStorage.removeItem('summaryPrice');
    document.querySelector('.total-price')!.innerHTML = 'Cart total: 0';
    document.querySelector('.total-in-block')!.innerHTML = 'Total: 0';
    document.querySelector('.basket')!.innerHTML = 'Cart';
    document.querySelector('.products-in-block')!.innerHTML = 'Products: 0';
    clearProducts();
  }
}

export function buy() {
  const payment = document.querySelector('.payment') as HTMLElement;
  payment.style.display = 'flex';
}

export function hidePayment() {
  const payment = document.querySelector('.payment') as HTMLElement;
  payment.style.display = 'none';
}
