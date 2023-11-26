import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { AddProductDto } from './dtos/add.product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
  ) { }
  

  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct( @Body() body: AddProductDto, @Request() request ) {
    const user = request.user
    return await this.productsService.addProduct(body.title, body.description, body.price, user)
  }
}
