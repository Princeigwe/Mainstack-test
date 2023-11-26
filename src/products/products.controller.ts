import { Controller, Post, Body, Request, UseGuards, Patch, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { AddProductDto } from './dtos/add.product.dto';
import { EditProductDto } from './dtos/edit.prpduct.dto';
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


  @UseGuards(JwtAuthGuard)
  @Patch('/:product_id')
  async editProduct( @Param('product_id') product_id: string, @Request() request, @Body() body: EditProductDto ) {
    const user = request.user
    return await this.productsService.editProduct(user, product_id, body.title, body.description, body.price, body.is_available)
  }
}
