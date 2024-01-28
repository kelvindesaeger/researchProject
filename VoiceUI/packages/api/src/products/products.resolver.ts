import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { ProductTypesService } from 'src/product-types/product-types.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly producttypesService: ProductTypesService,  
  ) {}

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    console.log(createProductInput);
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => [Product])
  createManyProducts() {
    return this.productsService.createMany();
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  // Resolver for the type field of the Product type
  @ResolveField()
  productType(@Parent() product: Product): Promise<ProductType> {
    return this.producttypesService.findOne(product.productTypeId.toString());
  }

}
