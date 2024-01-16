import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { ObjectIdColumn, Column, Entity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class Product {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Field(() => ProductType)
  productType: ProductType;

  @Column()
  productTypeId: ObjectId;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  img: string;

  @Column()
  @Field(() => Float)
  price: number;
}
