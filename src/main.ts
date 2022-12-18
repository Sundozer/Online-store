import data from './data';

const mainContainerCards = document.querySelector('.main-container-cards');

export function createCardsProduct() {
    if (mainContainerCards !== null) {
      for (const key in data.products) {
        // let keys:string = key;
        if (Object.prototype.hasOwnProperty.call(data.products, key)) {
          createCardProduct(+key, mainContainerCards);
        }
      }
    }
  }

function createCardProduct(key: number, mainContainerCards:Element) {
  const framesСard = document.createElement('div');
  framesСard.classList.add('frames-card');
  mainContainerCards.append(framesСard);
  // framesСard.style.backgroundImage = `"url(${data.products[key].images[0]})"`;
  framesСard.style.background = `url(${data.products[key].images[0]})`;
  framesСard.style.backgroundRepeat = "no-repeat";
  framesСard.style.backgroundSize = "cover";

  // const img = document.createElement('img');
  // img.src = data.products[key].images[0];
  // img.classList.add('item-image');
  // framesСard.append(img);


}


