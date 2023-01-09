import { sortDate } from './sort';
import { IFilteredData, Separator, FilterItems } from './interfaces';
import { createCardsProduct, deleteCardsProduct } from './main';
/* eslint-disable-next-line */
import { filteredData } from './index';
import { createDetailedCard } from './detailed-card';

import data from './data';

export function AlladdEventListenerCards() {
  const optionElements = document.querySelector('.select') as HTMLSelectElement;
  optionElements.options.selectedIndex = Number(localStorage.getItem('selectedSort'));
  optionElements!.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    localStorage.setItem('selectedSort', String(optionElements.options.selectedIndex));
    sortDate(target.value, filteredData);// вот эту сортировку наверное тоже надо добавить в твой фильтр, чтобы она подтягивалась
    deleteCardsProduct(); // при фильтрации, типа ткнул сначала с сортировку, потом выбрал группу. И она уже осортирована.
    createCardsProduct(filteredData);
  });

  const gridWrap = document.querySelectorAll('.grid-wrap');
  if (localStorage.getItem('selectedSize') === 'small') {
    gridWrap[1].classList.add('wrap-style');
    gridWrap[0].classList.remove('wrap-style');
  } else {
    gridWrap[0].classList.add('wrap-style');
    gridWrap[1].classList.remove('wrap-style');
  }

  gridWrap[0].addEventListener('click', (event) => {
    const target = event.target as HTMLSelectElement;
    gridWrap[0].classList.add('wrap-style');
    gridWrap[1].classList.remove('wrap-style');
    localStorage.setItem('selectedSize', 'big');
    deleteCardsProduct();
    createCardsProduct(filteredData);
  });

  gridWrap[1].addEventListener('click', (event) => {
    const target = event.target as HTMLSelectElement;
    gridWrap[1].classList.add('wrap-style');
    gridWrap[0].classList.remove('wrap-style');
    localStorage.setItem('selectedSize', 'small');
    deleteCardsProduct();
    createCardsProduct(filteredData);
  });

  const central = document.querySelector('.central') as HTMLElement;
  const mainContainerCards = document.querySelector('.main-container-cards');
  mainContainerCards!.addEventListener('click', (event) => {
    const target = event.target as HTMLSelectElement;
    // debugger;
    const targetParent = target.parentElement?.parentElement;
    if ((targetParent?.className === 'frames-card' || targetParent?.className === 'frames-card-mini') && target.textContent === 'DETAILS') {
      central.style.display = 'none';
      const idTarget: string = targetParent.style.background.slice(5, -26);
      const idCart: IFilteredData = data.products.find((elem) => elem.thumbnail === idTarget)!;
      createDetailedCard(idCart);
    } else if (target.textContent !== 'ADD TO CART') {
      central.style.display = 'none';
      const idTarget: string = target.style.background.slice(5, -26);
      const idCart: IFilteredData = data.products.find((elem) => elem.thumbnail === idTarget)!;
      createDetailedCard(idCart);
    }
  });


  const copied = document.querySelector('.copied') as HTMLButtonElement;
  copied.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
    }
  })
}
