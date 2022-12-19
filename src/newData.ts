interface FilterObject extends Object {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[]
}

export default function (object: FilterObject, activeFilter: { category: string[], brand: string[], price: number[], stock: number[] }, categories: string[], brands: string[]): FilterObject | undefined {
  let cat: string[] = activeFilter.category;
  if (activeFilter.category.length === 0) {
    cat = categories;
  }
  let { brand } = activeFilter;
  if (activeFilter.brand.length === 0) {
    brand = brands;
  }
  if (object.price > Math.max.apply(null, activeFilter.price) || object.price < Math.min.apply(null, activeFilter.price)) {
    return undefined;
  }
  if (object.stock > Math.max.apply(null, activeFilter.stock) || object.stock < Math.min.apply(null, activeFilter.stock)) {
    return undefined;
  }
  if (!cat.includes(object.category)) {
    return undefined;
  }
  if (!brand.includes(object.brand)) {
    return undefined;
  }
  return object;
}
// here objects transform to filtered objects
