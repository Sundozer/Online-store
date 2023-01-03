import { IFilteredData } from './interfaces'

export function clearProducts () {
    const products = document.querySelector('.products-list') as HTMLElement;
    products.replaceChildren()
}

export function placeToCart (obj: IFilteredData) {
    const products = document.querySelector('.products-in-cart') as HTMLElement;
    const div = document.createElement('div');
    
}