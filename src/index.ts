import './style.scss';
import './style-main.scss';
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

// if (main !== null) {
//     let o = 0;
//     for (let i of data.products) {
//         let img = document.createElement("img");
//         img.src = data.products[o].images[0];
//         img.classList.add('item-image');
//         main.appendChild(img);
//         o++;
//     }
// }
