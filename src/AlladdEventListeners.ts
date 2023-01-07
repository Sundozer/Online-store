import { sortDate } from './sort';
import { IFilteredData, Separator, FilterItems } from './interfaces';
import { createCardsProduct, deleteCardsProduct } from './main';
import { filteredData } from './index';

export function AlladdEventListenerCards() {
  const optionElements = document.querySelector('.select');
  optionElements!.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    // getNewData();
    sortDate(target.value, filteredData);// вот эту сортировку наверное тоже надо добавить в твой фильтр, чтобы она подтягивалась
    deleteCardsProduct(); // при фильтрации, типа ткнул сначала с сортировку, потом выбрал группу. И она уже осортирована.
    createCardsProduct(filteredData);
  });

  const gridWrap = document.querySelectorAll('.grid-wrap');
  gridWrap[0].addEventListener('click', (event) => {
    const target = event.target as HTMLSelectElement;
    gridWrap[0].classList.add('wrap-style');
    gridWrap[1].classList.remove('wrap-style');
    // document.querySelector('.description-card');
    
  });
  gridWrap[1].addEventListener('click', (event) => {
    const target = event.target as HTMLSelectElement;
    gridWrap[1].classList.add('wrap-style');
    gridWrap[0].classList.remove('wrap-style');
  });
}

