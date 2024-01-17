import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ProductTypesService } from 'src/product-types/product-types.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productTypeRepository: ProductTypesService,
  ) {}

  async create(createProductInput: CreateProductInput) {
    try{

      const productType = await this.productTypeRepository.findOne(createProductInput.productTypeId);

      console.log(productType);

      if(!productType) {
        throw new Error('Product type not found');
      }

      const newProduct = new Product();

      newProduct.productTypeId = new ObjectId(productType.id);

      newProduct.name = createProductInput.name;
      newProduct.description = createProductInput.description;
      newProduct.img = createProductInput.img;
      newProduct.price = createProductInput.price;

      return this.productRepository.save(newProduct);

    } catch (e) {
      console.log(e);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    // @ts-ignore
    return this.productRepository.findOne({ _id: new ObjectId(id) });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
