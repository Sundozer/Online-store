import { IFilteredData } from './interfaces'


export function clearProducts () {
    const products = document.querySelector('.products-list') as HTMLElement;
    products.replaceChildren()
}

export function placeToCart (obj: IFilteredData) {
    const products = document.querySelector('.products-list') as HTMLElement;
    const img = document.createElement('img');
    const div = document.createElement('div');
    const innerDiv = document.createElement('div');
    products.append(div)
    div.classList.add('one-of-items')
    div.append(innerDiv)
    innerDiv.style.background = `url(${obj.images[0]})`
    innerDiv.style.backgroundRepeat = 'no-repeat';
    innerDiv.style.backgroundSize = 'cover';
    innerDiv.classList.add('back-img')

}


export function clearButtonCart () {
    localStorage.removeItem('shoppingList')
    localStorage.removeItem('summaryPrice')
    document.querySelector('.total-price')!.innerHTML = `Cart total: 0`
    document.querySelector('.total-in-block')!.innerHTML = `Total: 0`
    document.querySelector('.basket')!.innerHTML = `Cart`
    document.querySelector('.products-in-block')!.innerHTML = `Products: 0`
    clearProducts()
}