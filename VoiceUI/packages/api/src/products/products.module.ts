import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductTypesModule } from 'src/product-types/product-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductTypesModule,
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
