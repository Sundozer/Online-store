import data from './data';
import { IFilteredData } from './interfaces';

export function sortDate(objectCardsFilter: IFilteredData[]/*, property: string | number*/) {
  objectCardsFilter.sort((a, b) => {
    return a.price - b.price;
});
//   const sortedArray: { property: string | number; }[] = objectCardsFilter.sort((n1,n2) => {
//     if (n1.property > n2.property) {
//         return 1;
//     }

//     if (n1.property < n2.property) {
//         return -1;
//     }
//     return 0;
// });
}