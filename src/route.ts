type Obj = {
  category: string[],
  brand: string[],
  price: number[],
  stock: number[],
}

export function setRoute(obj: Obj):void {
  let route = '';
  let part1 = '';
  let part2 = '';
  let part3 = '';
  let part4 = '';
  const result: string[] = [];
  if (obj.category.length !== 0) {
    part1 += 'category:';
    const newArr:string[] = [];
    obj.category.forEach((el) => newArr.push(el));
    const newStr = newArr.join('|');
    part1 += newStr;
    result.push(part1);
  }
  if (obj.brand.length !== 0) {
    part2 += 'brand:';
    const newArr:string[] = [];
    obj.brand.forEach((el) => newArr.push(el));
    const newStr = newArr.join('|');
    part2 += newStr;
    result.push(part2);
  }
  if (Math.min.apply(null, obj.price) !== 10 || Math.max.apply(null, obj.price) !== 1749) {
    part3 += 'price:';
    const newArr:number[] = [];
    obj.price.forEach((el) => newArr.push(el));
    const newStr = newArr.join('|');
    part3 += newStr;
    result.push(part3);
  }
  if (Math.min.apply(null, obj.stock) !== 2 || Math.max.apply(null, obj.stock) !== 150) {
    part4 += 'stock:';
    const newArr:number[] = [];
    obj.stock.forEach((el) => newArr.push(el));
    const newStr = newArr.join('|');
    part4 += newStr;
    result.push(part4);
  }
  if (part1.length !== 0 || part2.length !== 0 || Math.min.apply(null, obj.price) !== 10 || Math.max.apply(null, obj.price) !== 1749 || Math.min.apply(null, obj.stock) !== 2 || Math.max.apply(null, obj.stock) !== 150) {
    route += '?';
    const newStr = result.join('&');
    route += newStr;
  }
  window.history.pushState({}, '', route);
  if (part1.length === 0 && part2.length === 0 && Math.min.apply(null, obj.price) === 10 && Math.max.apply(null, obj.price) === 1749 && Math.min.apply(null, obj.stock) === 2 && Math.max.apply(null, obj.stock) === 150) {
    /* eslint-disable-next-line */
    window.history.replaceState({}, '', location.pathname);
  }
}

export function getRoute (str: string) {
  let newStr = str.slice(1, str.length);
  let newArr = newStr.split('&');
  let newObj: Obj = {
    category: [],
    brand: [],
    price: [10, 1749],
    stock: [2, 150],
  }
  newArr.forEach(el => {
    let insideArr = el.split(':')
    if (insideArr[0] === 'category') {
      let insideCategory = insideArr[1].split('|')
      insideCategory.forEach(el => newObj.category.push(el))
     
    }
    if (insideArr[0] === 'brand') {
      let insideBrand = insideArr[1].split('|')
      insideBrand.forEach(el => newObj.brand.push(el))
    }
    if (insideArr[0] === 'price') {
      let insideBrand = insideArr[1].split('|')
      newObj.price[0] = Number(insideBrand[0]);
      newObj.price[1] = Number(insideBrand[1]);
    }
    console.log(str)


  })



  return newObj;
}