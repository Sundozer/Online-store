import './scss/style.scss';
import './scss/style-main.scss';
import './scss/style-elements.scss';
import './scss/style-card.scss';
import data from './data';
import newData from './newData';
import { createCardsProduct } from './main';

createCardsProduct();

const asideBlock = document.querySelector('.aside-block');
let filteredData: { id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[] }[] = [];
type FilterItems = {
  category: string[],
  brand: string[],
  price: number[],
  stock: number[],
};
type Separator = {
  category: string[],
  brand: string[]
};
let activeFilter: FilterItems = {
  category: [],
  brand: [],
  price: [],
  stock: [],
};
const staticFilter: FilterItems = {
  category: [],
  brand: [],
  price: [],
  stock: [],
};
const separator: Separator = {
  category: [],
  brand: [],
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
    if (!arr.includes(i.category)) { // Тут заполняются названиями первые два блока
      arr.push(i.category);
      document.querySelector('.aside-block_item-types')!.appendChild(div);
      document.querySelector('.aside-block_item-category')!.innerHTML += `<input type="checkbox" id="${i.category}" name="${i.category}"><span class="aside-block_one-of-items">${i.category}</span><br>`;
      separator.category.push(i.category);
    }
    if (!array.includes(i.brand)) {
      array.push(i.brand);
      document.querySelector('.aside-block_item-marks')!.appendChild(divv);
      document.querySelector('.aside-block_item-brands')!.innerHTML += `<input type="checkbox" id="${i.brand}" name="${i.brand}"><span class="aside-block_one-of-items">${i.brand}</span><br>`;
      separator.brand.push(i.brand);
    }
    if (staticFilter.price[0] === undefined || staticFilter.price[0] > i.price) { // тут заполняется статический фильтр
      staticFilter.price[0] = i.price;
    }
    if (staticFilter.price[1] === undefined || staticFilter.price[1] < i.price) {
      staticFilter.price[1] = i.price;
    }
    if (staticFilter.stock[0] === undefined || staticFilter.stock[0] > i.stock) {
      staticFilter.stock[0] = i.stock;
    }
    if (staticFilter.stock[1] === undefined || staticFilter.stock[1] < i.stock) {
      staticFilter.stock[1] = i.stock;
    }
  }
  if (localStorage.getItem('activeFilter') === null) {
    activeFilter = staticFilter;
  } else {
    activeFilter = JSON.parse(localStorage.getItem('activeFilter')!);
  }
}());

function getNewData() {
  filteredData = []
  data.products.forEach((el) => {
    let getting = newData(el, activeFilter, separator.category, separator.brand);
    if (getting !== undefined) {
      filteredData.push(getting);
    }
  });
  console.log(filteredData.length);
}

function placeToStorage() {
  localStorage.setItem('activeFilter', JSON.stringify(activeFilter));
  getNewData();
}

asideBlock!.addEventListener('click', (event) => { // Ставит и убирает галки в чекбоксах, заполняет первые две строки активного фильтра
  const e = event.target as HTMLElement;
  if (e.tagName === 'SPAN') {
    const checkbox = document.getElementById(`${e.innerHTML}`) as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false;
      if (separator.category.includes(e.innerHTML)) {
        activeFilter.category.splice(activeFilter.category.indexOf(e.innerHTML), 1);
        placeToStorage();
      }
      if (separator.brand.includes(e.innerHTML)) {
        activeFilter.brand.splice(activeFilter.brand.indexOf(e.innerHTML), 1);
        placeToStorage();
      }
    } else if (!checkbox.checked) {
      checkbox.checked = true;
      if (separator.category.includes(e.innerHTML)) {
        activeFilter.category.push(e.innerHTML);
        placeToStorage();
      }
      if (separator.brand.includes(e.innerHTML)) {
        activeFilter.brand.push(e.innerHTML);
        placeToStorage();
      }
    }
  }
});

function getPrices() { // Создаёт цифры в блоках в зависимости от положения ползунков
  document.querySelector('.lowest-price')!.innerHTML = Math.min.apply(null, activeFilter.price).toString();
  document.querySelector('.highest-price')!.innerHTML = Math.max.apply(null, activeFilter.price).toString();
}
function getStocks() {
  document.querySelector('.lowest-stock')!.innerHTML = Math.min.apply(null, activeFilter.stock).toString();
  document.querySelector('.highest-stock')!.innerHTML = Math.max.apply(null, activeFilter.stock).toString();
}
const input1 = document.querySelector('.input-price1')! as HTMLInputElement;
const input2 = document.querySelector('.input-price2')! as HTMLInputElement;
const input3 = document.querySelector('.input-stock1')! as HTMLInputElement;
const input4 = document.querySelector('.input-stock2')! as HTMLInputElement;

input1.addEventListener('input', () => { // считывает ползунки
  activeFilter.price[0] = Number(input1.value);
  getPrices();
  placeToStorage();
});
input2.addEventListener('input', () => {
  activeFilter.price[1] = Number(input2.value);
  getPrices();
  placeToStorage();
});
input3.addEventListener('input', () => {
  activeFilter.stock[0] = Number(input3.value);
  getStocks();
  placeToStorage();
});
input4.addEventListener('input', () => {
  activeFilter.stock[1] = Number(input4.value);
  getStocks();
  placeToStorage();
});

function placeRanges() { // размещает полузнки на треках, когда загружается страница
  input1.value = Math.min.apply(null, activeFilter.price).toString();
  input2.value = Math.max.apply(null, activeFilter.price).toString();
  input3.value = Math.min.apply(null, activeFilter.stock).toString();
  input4.value = Math.max.apply(null, activeFilter.stock).toString();
  getPrices();
  getStocks();
}
placeRanges();
function placeCheckBoxes() { // ставит галки на чекбоксах, когда загружается страница
  activeFilter.category.forEach((el) => {
    const oneOfBoxes = document.getElementById(`${el}`) as HTMLInputElement;
    oneOfBoxes.checked = true;
  });
  activeFilter.brand.forEach((el) => {
    const oneOfBoxes = document.getElementById(`${el}`) as HTMLInputElement;
    oneOfBoxes.checked = true;
  });
}
placeCheckBoxes();
document.querySelector('.reset-filters')!.addEventListener('click', () => { // кнопка сброса фильтров, снимает все чеки, возвращает ползунки на место, очищает активный фильтр
  activeFilter.category.forEach((el) => {
    const oneOfBoxes = document.getElementById(`${el}`) as HTMLInputElement;
    oneOfBoxes.checked = false;
  });
  activeFilter.brand.forEach((el) => {
    const oneOfBoxes = document.getElementById(`${el}`) as HTMLInputElement;
    oneOfBoxes.checked = false;
  });
  activeFilter = staticFilter;
  getPrices();
  placeRanges();
  placeToStorage();
});
