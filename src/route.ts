export default function setRoute(obj: { category: string[], brand: string[], price: number[], stock: number[] }):void {
  let route = '';
  let part1 = '';
  let part2 = '';
  let part3 = '';
  let part4 = '';
  let result: string[] = [];
  if (obj.category.length !== 0) {
    part1 +='category:'
    let newArr:string[] = []
    obj.category.forEach((el) => newArr.push(el));
    let newStr = newArr.join('↕')
    part1 += newStr
    result.push(part1)
  }
  if (obj.brand.length != 0) {
    part2 +='brand:'
    let newArr:string[] = []
    obj.brand.forEach((el) => newArr.push(el));
    let newStr = newArr.join('↕')
    part2 += newStr
    result.push(part2)
  }
  if (Math.min.apply(null, obj.price) !== 10 || Math.max.apply(null, obj.price) !== 1749) {
    part3 +='price:'
    let newArr:number[] = []
    obj.price.forEach((el) => newArr.push(el));
    let newStr = newArr.join('↕')
    part3 += newStr
    result.push(part3)
  }
  if (Math.min.apply(null, obj.stock) !== 2 || Math.max.apply(null, obj.stock) !== 150) {
    part4 +='stock:'
    let newArr:number[] = []
    obj.stock.forEach((el) => newArr.push(el));
    let newStr = newArr.join('↕')
    part4 += newStr
    result.push(part4)
  }
  if (part1.length !== 0 || part2.length !== 0 || Math.min.apply(null, obj.price) !== 10 || Math.max.apply(null, obj.price) !== 1749 || Math.min.apply(null, obj.stock) !== 2 || Math.max.apply(null, obj.stock) !== 150) {
    route += '?'
    let newStr = result.join('&')
    route += newStr;
  }
  window.history.pushState({}, '', route);
  if (part1.length == 0 && part2.length == 0 && Math.min.apply(null, obj.price) == 10 && Math.max.apply(null, obj.price) == 1749 && Math.min.apply(null, obj.stock) == 2 && Math.max.apply(null, obj.stock) == 150) {
    window.history.replaceState({}, '', location.pathname);
  }


  
}
