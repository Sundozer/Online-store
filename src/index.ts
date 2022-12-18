import './style.scss';
import data from './data';
const main = document.querySelector('.main');
const asideBlock = document.querySelector('.aside-block');
const activeFilters = {
  category: undefined,
  brand: undefined,
  price: undefined,
  stock: undefined
};

(function category() {
  const arr: string[] = [];
  const array: string[] = [];
  const categories = document.querySelector('.aside-block_item-types')!;
  categories.innerHTML = '';
  const input = document.createElement('checkbox');
  const div = document.createElement('div');
  div.classList.add('aside-block_item-category');
  const divv = document.createElement('div');
  divv.classList.add('aside-block_item-brands');
  /* eslint-disable-next-line */
  for (const i of data.products) {
    if (!arr.includes(i.category)) {
      arr.push(i.category);
      document.querySelector('.aside-block_item-types')!.appendChild(div);
      document.querySelector('.aside-block_item-category')!.innerHTML += `<input type="checkbox" id="${i.category}" name="${i.category}"><span class="aside-block_one-of-items">${i.category}</span><br>`;
    }
    if (!array.includes(i.brand)) {
      array.push(i.brand);
      document.querySelector('.aside-block_item-marks')!.appendChild(divv);
      document.querySelector('.aside-block_item-brands')!.innerHTML += `<input type="checkbox" id="${i.brand}" name="${i.brand}"><span class="aside-block_one-of-items">${i.brand}</span><br>`;
    }
  }
}());

asideBlock!.addEventListener('click', function(event){
  const e = event.target as HTMLElement
  if (e.tagName === 'SPAN') {
    let checkbox = document.getElementById(`${e.id}`) as HTMLInputElement;
    checkbox.checked = true;
  }
  if (e.tagName === 'INPUT') {
    console.log(e.id)
  }
  
})
