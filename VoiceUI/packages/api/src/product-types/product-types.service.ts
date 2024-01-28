import { Injectable } from '@nestjs/common';
import { CreateProductTypeInput } from './dto/create-product-type.input';
import { UpdateProductTypeInput } from './dto/update-product-type.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductTypesService {

  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  create(createProductTypeInput: CreateProductTypeInput) {
    const newProductType = new ProductType();

    newProductType.name = createProductTypeInput.name;
    newProductType.description = createProductTypeInput.description;

    return this.productTypeRepository.save(newProductType);
  }

  createMany() {
    // if there are product types delete them all
    this.productTypeRepository.clear();

    const productTypes = [
      {
        name: "Burger",
        description: "The best burgers"
      },
      {
        name: "Side",
        description: "The best sides"
      },
      {
        name: "Drink",
        description: "The best drinks"
      }
    ];

    const newProductTypes: ProductType[] = [];
    
    productTypes.forEach(async productType => {
      const newProductType = new ProductType();

      newProductType.name = productType.name;
      newProductType.description = productType.description;

      const newpt = await this.productTypeRepository.save(newProductType);
      newProductTypes.push(newpt);
    });

    return newProductTypes;
  }

  findAll() {
    return this.productTypeRepository.find();
  }

  findOne(id: string) {
    // @ts-ignore
    return this.productTypeRepository.findOne({ _id: new ObjectId(id) });
  }

  update(id: number, updateProductTypeInput: UpdateProductTypeInput) {
    return `This action updates a #${id} productType`;
  }

  remove(id: number) {
    return `This action removes a #${id} productType`;
  }
}
