import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productTypeId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  img: string;

  @Field(() => Float)
  price: number;
}
