import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private usersService: UsersService
  ) { }
  
  async addProduct(title: string, description: string, price: number, user: User) {
    const currentUser = await this.usersService.getUserByEmail(user.email)
    let familiarProduct = await this.productModel.findOne({ title: title, description: description }).exec()
    if (familiarProduct) {
      throw new HttpException("Product with title and description already exist. You can choose to modify the attributes of product", HttpStatus.BAD_REQUEST)
    }
    let product = await this.productModel.create({ title: title, description: description, price: price, vendor: currentUser._id })
    product.save()
    return {
      message: "Product added",
      data: product
    }
  }
}
