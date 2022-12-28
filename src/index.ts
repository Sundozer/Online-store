import './scss/style.scss';
import './scss/style-main.scss';
import './scss/style-elements.scss';
import './scss/style-card.scss';
import data from './data';
import newData from './newData';
import setRoute from './route'
import { createCardsProduct, deleteCardsProduct } from './main';
import { IFilteredData } from './interfaces';

// Сделай, пожалуйста, чтобы твоя функция вызывалась с датой внутри, вроде:
// createCardsProduct(data.products)
// Чтобы она не брала дату сама по себе напрямую.
// Потому что я уже настроил фильтр, он выдаёт массив 'filteredData', её надо закидывать в твою функцию
const asideBlock = document.querySelector('.aside-block');
const input1 = document.querySelector('.input-price1')! as HTMLInputElement;
const input2 = document.querySelector('.input-price2')! as HTMLInputElement;
const input3 = document.querySelector('.input-stock1')! as HTMLInputElement;
const input4 = document.querySelector('.input-stock2')! as HTMLInputElement;
let filteredData: IFilteredData[] = [];
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

const separator: Separator = {
  category: [],
  brand: [],
};

function upperFilter() { // расставляет ползунки цены и стока в зависимости от оставшихся элементов
  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  let minStock: number | undefined;
  let maxStock: number | undefined;
  filteredData.forEach((el) => {
    if (minPrice === undefined) {
      minPrice = el.price;
    } else if (minPrice > el.price) {
      minPrice = el.price;
    }
    if (maxPrice === undefined) {
      maxPrice = el.price;
    } else if (maxPrice < el.price) {
      maxPrice = el.price;
    }

    if (minStock === undefined) {
      minStock = el.stock;
    } else if (minStock > el.stock) {
      minStock = el.stock;
    }
    if (maxStock === undefined) {
      maxStock = el.stock;
    } else if (maxStock < el.stock) {
      maxStock = el.stock;
    }
  });
  document.querySelector('.lowest-price')!.innerHTML = minPrice!.toString();
  document.querySelector('.highest-price')!.innerHTML = maxPrice!.toString();
  document.querySelector('.lowest-stock')!.innerHTML = minStock!.toString();
  document.querySelector('.highest-stock')!.innerHTML = maxStock!.toString();
  input1.value = minPrice!.toString();
  input2.value = maxPrice!.toString();
  input3.value = minStock!.toString();
  input4.value = maxStock!.toString();
}

function getNewData() { // Создаёт отфильтрованный список
  filteredData = [];
  data.products.forEach((el) => {
    const getting = newData(el, activeFilter, separator.category, separator.brand);
    if (getting !== undefined) {
      filteredData.push(getting);
    }
  });
  
  deleteCardsProduct();// удаление карточек перед формированием нового набора
  createCardsProduct(filteredData);// вызов функции добавил сюда, верно ли, исходя из логики?
  upperFilter();
  setRoute(activeFilter)
}

(function category() { // заполняет блоки элементами из даты
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
  }
  if (localStorage.getItem('activeFilter') === null) {
    activeFilter = {
      category: [],
      brand: [],
      price: [10, 1749],
      stock: [2, 150],
    };
  } else {
    activeFilter = JSON.parse(localStorage.getItem('activeFilter')!);
  }
  getNewData();
}());

function placeToStorage() { // добавляет фильтр в лок хранилище
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
  if (e.tagName === 'INPUT' && e.id.length > 0) {
    const che = e as HTMLInputElement;
    if (!che.checked) {
      if (separator.category.includes(che.id)) {
        activeFilter.category.splice(activeFilter.category.indexOf(che.id), 1);
        placeToStorage();
      }
      if (separator.brand.includes(che.id)) {
        activeFilter.brand.splice(activeFilter.brand.indexOf(che.id), 1);
        placeToStorage();
      }
    } else if (che.checked) {
      if (separator.category.includes(che.id)) {
        activeFilter.category.push(che.id);
        placeToStorage();
      }
      if (separator.brand.includes(che.id)) {
        activeFilter.brand.push(che.id);
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
// placeRanges();
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
  activeFilter = {
    category: [],
    brand: [],
    price: [10, 1749],
    stock: [2, 150],
  };
  getPrices();
  placeRanges();
  placeToStorage();
});
