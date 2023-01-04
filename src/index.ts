import './scss/style.scss';
import './scss/style-main.scss';
import './scss/style-elements.scss';
import './scss/style-card.scss';
import data from './data';
import newData from './newData';
import { setRoute, getRoute, checkPage, showMain } from './route';
import { createCardsProduct, deleteCardsProduct } from './main';
import { IFilteredData, Separator, FilterItems } from './interfaces';
import { sortDate } from './sort';
import { placeToCart, clearProducts, clearButtonCart } from './cart';


let shoppingList: string[];
const asideBlock = document.querySelector('.aside-block');
const input1 = document.querySelector('.input-price1')! as HTMLInputElement;
const input2 = document.querySelector('.input-price2')! as HTMLInputElement;
const input3 = document.querySelector('.input-stock3')! as HTMLInputElement;
const input4 = document.querySelector('.input-stock4')! as HTMLInputElement;
const clearCartButton = document.querySelector('.clear-cart-button')
let summaryPrice:number = 0;
let filteredData: IFilteredData[] = [];
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
if (localStorage.getItem('shoppingList') !== null) {
  let get: string  = localStorage.getItem('shoppingList')!
  shoppingList = JSON.parse(get)
  document.querySelector('.basket')!.innerHTML = `Cart: ${shoppingList.length}`
  document.querySelector('.products-in-block')!.innerHTML = `Products: ${shoppingList.length}`
} else {
  shoppingList = [];
}
if (localStorage.getItem('summaryPrice') !== null) {
  document.querySelector('.total-price')!.innerHTML = `Cart total: ${Number(localStorage.getItem('summaryPrice'))}`
  document.querySelector('.total-in-block')!.innerHTML = `Total: ${Number(localStorage.getItem('summaryPrice'))}`
}


function upperFilter(e?: string) { // расставляет ползунки цены и стока в зависимости от оставшихся элементов
  let ev: string;
  let inputted = 0;
  if (e !== undefined) {
    ev = e[e.length - 1];
    inputted = Number(ev);
  }
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
  if (minPrice !== undefined) {
    if (inputted !== 1 && inputted !== 2) {
      input1.value = minPrice!.toString();
      input2.value = maxPrice!.toString();
    }
    document.querySelector('.lowest-price')!.innerHTML = minPrice!.toString();
    document.querySelector('.highest-price')!.innerHTML = maxPrice!.toString();
    if (inputted !== 3 && inputted !== 4) {
      input3.value = minStock!.toString();
      input4.value = maxStock!.toString();
    }
    document.querySelector('.lowest-stock')!.innerHTML = minStock!.toString();
    document.querySelector('.highest-stock')!.innerHTML = maxStock!.toString();
  }
}

function getNewData(e?: string) { // Создаёт отфильтрованный список
  filteredData = [];
  data.products.forEach((el) => {
    const getting = newData(el, activeFilter, separator.category, separator.brand);
    if (getting !== undefined) {
      filteredData.push(getting);
    }
  });
  const found = document.querySelector('.span-main-header') as HTMLElement;
  found.innerHTML = `Found: ${filteredData.length}`
  const selected = document.querySelector('.select') as HTMLSelectElement;
  sortDate(selected.value, filteredData);
  deleteCardsProduct();// удаление карточек перед формированием нового набора
  createCardsProduct(filteredData);
  upperFilter(e);
}

function checkURL(e?: string) { // чекает юрл, чтобы заполнить активный фильтр
  if (window.location.search.length > 1) {
    const getFilter = getRoute(window.location.search, separator);
    activeFilter = getFilter;
  } else if (localStorage.getItem('activeFilter') === null) {
    activeFilter = {
      category: [],
      brand: [],
      price: [10, 1749],
      stock: [2, 150],
    };
  } else {
    activeFilter = JSON.parse(localStorage.getItem('activeFilter')!);
  }
  getNewData(e);
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
  checkURL();
}());

function placeToStorage(ev?: string) { // добавляет фильтр в лок хранилище
  localStorage.setItem('activeFilter', JSON.stringify(activeFilter));
  getNewData(ev);
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
  setRoute(activeFilter);
});

input1.addEventListener('input', (e) => { // считывает ползунки
  activeFilter.price[0] = Number(input1.value);
  const ev = e.target as HTMLElement;
  placeToStorage(ev.classList[0]);
});
input2.addEventListener('input', (e) => {
  activeFilter.price[1] = Number(input2.value);
  const ev = e.target as HTMLElement;
  placeToStorage(ev.classList[0]);
});
input3.addEventListener('input', (e) => {
  activeFilter.stock[0] = Number(input3.value);
  const ev = e.target as HTMLElement;
  placeToStorage(ev.classList[0]);
});
input4.addEventListener('input', (e) => {
  activeFilter.stock[1] = Number(input4.value);
  const ev = e.target as HTMLElement;
  placeToStorage(ev.classList[0]);
});

function placeCheckBoxes() { // ставит галки на чекбоксах, когда загружается страница
  const boxes = document.querySelectorAll('input[type=checkbox]');
  boxes.forEach((el) => {
    const box = el as HTMLInputElement;
    box.checked = false;
  });
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

function resetFilters() {
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
  placeToStorage();
  setRoute(activeFilter);
}



document.querySelector('.reset-filters')!.addEventListener('click', resetFilters);
document.querySelector('.main-navigation_online-store')!.addEventListener('click', showMain);

const optionElements = document.querySelector('.select');
optionElements!.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement;
  // getNewData();
  sortDate(target.value, filteredData);// вот эту сортировку наверное тоже надо добавить в твой фильтр, чтобы она подтягивалась
  deleteCardsProduct(); // при фильтрации, типа ткнул сначала с сортировку, потом выбрал группу. И она уже осортирована.
  createCardsProduct(filteredData);
});
window.addEventListener('popstate', () => {
  if (window.location.search.length < 2) {
    activeFilter = {
      category: [],
      brand: [],
      price: [10, 1749],
      stock: [2, 150],
    };
    getNewData();
  } else {
    checkURL();
  }
  placeCheckBoxes();
  checkPage();
});

document.querySelector('.basket')!.addEventListener('click', () => {
  let central = document.querySelector('.central') as HTMLElement;
  let cart = document.querySelector('.cart') as HTMLElement;
  central.style.display = 'none';
  cart.style.display = 'block';
  window.history.pushState({}, '', 'cart');
  checkPage();
})

window.addEventListener('click', (e) => {
  const event = e.target as HTMLElement;
  if (event.innerHTML === 'ADD TO CART') {
    clearProducts()
    shoppingList.push(event.parentElement!.previousElementSibling!.previousElementSibling!.innerHTML)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    shoppingList.forEach(el => {
      const founded = data.products.find(element => element.title === el)
      summaryPrice += founded!.price;
      localStorage.setItem('summaryPrice', summaryPrice.toString())
      document.querySelector('.total-price')!.innerHTML = `Cart total: ${summaryPrice}`
      document.querySelector('.total-in-block')!.innerHTML = `Total: ${summaryPrice}`
      document.querySelector('.basket')!.innerHTML = `Cart: ${shoppingList.length}`
      document.querySelector('.products-in-block')!.innerHTML = `Products: ${shoppingList.length}`
      placeToCart(founded!)
    })
  }
})

clearCartButton?.addEventListener('click', () => {
  clearButtonCart()
  shoppingList = [];
  summaryPrice = 0;
})