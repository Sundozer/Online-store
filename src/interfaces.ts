export interface IFilteredData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export type Separator = {
  category: string[],
  brand: string[]
};
export type FilterItems = {
  category: string[],
  brand: string[],
  price: number[],
  stock: number[],
};
