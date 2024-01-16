import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductTypeInput {
  

  @Field()
  name: string;

  @Field()
  description: string;
}
