import data from './data';
import { IFilteredData } from './interfaces';

export function sortDate(value: string, objectCardsFilter: IFilteredData[]) {
  // debugger;
  switch (value) {
    case 'price ASC':
      sortDatePriceASC(objectCardsFilter);
      break;
    case 'price DESC':
      sortDatePriceDESC(objectCardsFilter);
      break;
    default:
      break;
  }
}

function sortDatePriceASC(objectCardsFilter: IFilteredData[]) {
  objectCardsFilter.sort((a, b) => a.price - b.price);
}

function sortDatePriceDESC(objectCardsFilter: IFilteredData[]) {
  objectCardsFilter.sort((a, b) => b.price - a.price);
}

// const optionElements = document.querySelectorAll('.options');
// optionElements[0]!.addEventListener('click', (event) => {
//   const e = event.target as HTMLElement;
//   // if (e === option)
//   debugger;
// })

// var sortedArray: { age: number; }[] = objectArray.sort((n1, n2) => {
//   if (n1.age > n2.age) {
//       return 1;
//   }

//   if (n1.age < n2.age) {
//       return -1;
//   }

//   return 0;
// });
