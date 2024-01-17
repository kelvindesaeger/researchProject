import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Product as ProductInterface } from '../interfaces/product.interface';
import { ProductType as ProductTypeInterface } from '../interfaces/productType.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsQuery: QueryRef<{characters: ProductInterface}>;
  private productTypesQuery: QueryRef<{character: ProductTypeInterface}>;

  constructor(private apollo: Apollo) { 
    this.productsQuery = this.apollo.watchQuery({
      query: gql`query {
        products {
          id
          productType{id name}
          name
          description
          img
          price
        }
      }`
    });
    this.productTypesQuery = this.apollo.watchQuery({
      query: gql`query {
        productTypes {
          id
          name
          description
        }
      }`
    });
  }

  async getProducts(): Promise<ProductInterface[]> {
    const result = await this.productsQuery.refetch();
    // @ts-ignore
    return result.data.products;
  }

}
