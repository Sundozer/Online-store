import './scss/style.scss';
import './scss/style-main.scss';
import './scss/style-elements.scss';
import data from './data';

const mainContainerCards = document.querySelector('.main-container-cards');


function createCardsProduct () {
  if (mainContainerCards !== null) {
    for (const key in data.products) {
      if (Object.prototype.hasOwnProperty.call(data.products, key)) {
        let img = document.createElement("img");
        img.src = data.products[key].images[0];
        img.classList.add('item-image');
        mainContainerCards.appendChild(img);
        }
    }
  }
}

createCardsProduct ();

// function filter (array: object) {

// }
// filter(data)
(function category () {
  let arr: string[] = []
  let array: string[] = []
  let categories = document.querySelector('.aside-block_item-types')!;
  categories.innerHTML = '';
  let input = document.createElement('checkbox');
  let div = document.createElement('div');
  div.classList.add('aside-block_item-category')
  let divv = document.createElement('div');
  divv.classList.add('aside-block_item-brands')
  for (let i of data.products) {
    if (!arr.includes(i.category)) {
      
      arr.push(i.category)
      document.querySelector('.aside-block_item-types')!.appendChild(div)
      document.querySelector('.aside-block_item-category')!.innerHTML += `<input type="checkbox" id="${i.category}" name="${i.category}"><span class="aside-block_one-of-items">${i.category}</span><br>`;
    }
    if (!array.includes(i.brand)) {
      
      array.push(i.brand)
      document.querySelector('.aside-block_item-marks')!.appendChild(divv)
      document.querySelector('.aside-block_item-brands')!.innerHTML += `<input type="checkbox" id="${i.brand}" name="${i.brand}"><span class="aside-block_one-of-items">${i.brand}</span><br>`;
    }
    
  }
})();
