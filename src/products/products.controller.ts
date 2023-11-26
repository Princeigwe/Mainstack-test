import { Controller, Post, Body, Request, UseGuards, Patch, Param, Query, Get, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { AddProductDto } from './dtos/add.product.dto';
import { EditProductDto } from './dtos/edit.prpduct.dto';
import { ProductsService } from './products.service';
import { use } from 'passport';

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


  @UseGuards(JwtAuthGuard)
  @Get('my-products')
  async getMyProducts(@Request() request, @Query('is_available') is_available?: boolean ) {
    const user = request.user
    return await this.productsService.getMyProducts(user, is_available)
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-products/:product_id')
  async getProductByVendor(@Param('product_id') product_id: string, @Request() request) {
    const user = request.user
    return await this.productsService.getProductByVendor(product_id, user)
  }


  @UseGuards(JwtAuthGuard)
  @Delete('my-products')
  async deleteMyProducts(@Request() request) {
    const user = request.user
    return await this.productsService.deleteMyProducts(user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('my-products/:product_id')
  async deleteMyProduct(@Param('product_id') product_id: string, @Request() request) {
    const user = request.user
    return await this.productsService.deleteMyProduct(product_id, user)
  }

}
