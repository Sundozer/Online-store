export function showFilter() {
    const burg = document.querySelector('.burger') as HTMLButtonElement;
    const categ = document.querySelector('.aside-block_category.aside-block__general') as HTMLElement;
    const bran = document.querySelector('.aside-block_brand.aside-block__general') as HTMLElement;
    const pric = document.querySelector('.aside-block_price.aside-block__general') as HTMLElement;
    const sto = document.querySelector('.aside-block_stock.aside-block_price.aside-block__general') as HTMLElement;
    const asid = document.querySelector('.aside-block') as HTMLElement;
    if (burg.innerHTML === "Show Filters") {
        categ.style.display = 'block';
        bran.style.display = 'block';
        pric.style.display = 'block';
        sto.style.display = 'block';
        asid.style.height = '100vh';
        burg.innerHTML = 'Hide Filters'
    } else {
        categ.style.display = 'none';
        bran.style.display = 'none';
        pric.style.display = 'none';
        sto.style.display = 'none';
        asid.style.height = '70px';
        burg.innerHTML = 'Show Filters'
    }
    
    
}