import data from './data';
import { IFilteredData } from './interfaces';

export function sortDate(value: string, objectCardsFilter: IFilteredData[]) {

  switch(value) {
    case 'price ASC':
      sortDateASC(objectCardsFilter, 'price');
      break;
    case 'price DESC':
      sortDateDESC(objectCardsFilter, 'price');
      break;
    case 'discount ASC':
      sortDateASC(objectCardsFilter, 'discountPercentage');
      break;
    case 'discount DESC':
      sortDateDESC(objectCardsFilter, 'discountPercentage');
      break;
    case 'rating ASC':
      sortDateASC(objectCardsFilter, 'rating');
      break;
    case 'rating DESC':
      sortDateDESC(objectCardsFilter, 'rating');
      break;   
    default:
      break;
  }

  function sortDateASC(objectCardsFilter: IFilteredData[], sortProp: string) {
    objectCardsFilter.sort((a, b) => {
      return +a[sortProp as keyof IFilteredData] - +b[sortProp as keyof IFilteredData];
    });
  }
  function sortDateDESC(objectCardsFilter: IFilteredData[], sortProp: string) {
    objectCardsFilter.sort((a, b) => {
      return +b[sortProp as keyof IFilteredData] - +a[sortProp as keyof IFilteredData];
    });
  }
}