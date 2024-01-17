import { ProductType } from "./productType.interface";

export interface Product {
    id?: string;
    productType?: ProductType;
    name?: string;
    description?: string;
    img?: string;
    price?: number;
    // add other properties as needed
  }
  