export default function setRoute (obj: {category: string[], brand: string[], price: number[], stock: number[]}):void {
    let route  = `?`
    if (obj.category.length !== 0) {
        obj.category.forEach(el => route += el)
    }
    console.log(route)
    window.history.pushState({}, '', route)
}