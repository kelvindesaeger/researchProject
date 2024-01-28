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

  async createMany() {
    this.productRepository.clear();

    const productTypes = await this.productTypeRepository.findAll();

    const products = [
      {
        productType: {
          name: "Burger"
        },
        name: "Bacon Burger",
        description: "A classic burger topped with crispy bacon.",
        img: "burger.jpg",
        price: 6.99
      },
      {
        productType: {
          name: "Burger"
        },
        name: "Cheeseburger Deluxe",
        description: "A juicy burger with melted cheese and fresh vegetables.",
        img: "burger.jpg",
        price: 7.49
      },
      {
        productType: {
          name: "Burger"
        },
        name: "Mushroom Swiss Burger",
        description: "A flavorful burger topped with sautéed mushrooms and Swiss cheese.",
        img: "burger.jpg",
        price: 8.29
      },
      {
        productType: {
          name: "Burger"
        },
        name: "Spicy Jalapeño Burger",
        description: "A fiery burger with jalapeño slices and spicy mayo.",
        img: "burger.jpg",
        price: 7.99
      },
      {
        productType: {
          name: "Burger"
        },
        name: "BBQ Ranch Burger",
        description: "A tangy burger with BBQ sauce, crispy onion rings, and ranch dressing.",
        img: "burger.jpg",
        price: 8.49
      },
      {
        productType: {
          name: "Side"
        },
        name: "French Fries",
        description: "Crispy golden fries seasoned to perfection.",
        img: "fries.jpg",
        price: 2.99
      },
      {
        productType: {
          name: "Side"
        },
        name: "Onion Rings",
        description: "Crunchy battered onion rings with a savory flavor.",
        img: "onionRings.jpg",
        price: 3.49
      },
      {
        productType: {
          name: "Drink"
        },
        name: "Cola",
        description: "Classic cola flavor with a hint of vanilla.",
        img: "cola.jpg",
        price: 2.49
      },
      {
        productType: {
          name: "Drink"
        },
        name: "Fanta",
        description: "Bright and bubbly orange soda.",
        img: "fanta.png",
        price: 2.49
      },
      {
        productType: {
          name: "Drink"
        },
        name: "Sprite",
        description: "Refreshing lemon-lime soda.",
        img: "sprite.png",
        price: 2.49
      }      
    ];

    const newProducts: Product[] = [];

    products.forEach(async product => {
      const newProduct = new Product();

      const productType = productTypes.find(pt => pt.name === product.productType.name);

      if(!productType) {
        throw new Error('Product type not found');
      }

      newProduct.productTypeId = new ObjectId(productType.id);

      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.img = product.img;
      newProduct.price = product.price;

      const np = await this.productRepository.save(newProduct);
      newProducts.push(np);
    });

    return newProducts;
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
