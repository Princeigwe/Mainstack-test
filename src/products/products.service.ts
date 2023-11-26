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


  async getProductByVendor(product_id: string, user: User) {
    const currentUser  = await this.usersService.getUserByEmail(user.email)
    const product = await this.productModel.findOne({ '_id': product_id, 'vendor': currentUser._id })
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }
    return product
  }


  async editProduct(user: User, product_id: string, title?: string, description?: string, price?: number, is_available?: boolean) {
    const currentUser = await this.usersService.getUserByEmail(user.email)
    const product = await this.productModel.findOne({ _id: product_id, vendor: currentUser._id })
    if (!product) {
      throw new HttpException("Invalid request", HttpStatus.BAD_REQUEST)
    }
    const query = { '_id': product._id, 'vendor': currentUser._id}
    const updateData = {'$set': { title: title, description: description, price: price, is_available: is_available }}
    await this.productModel.updateOne(query, updateData)
    return {
      message: "Product Updated",
      data: await this.getProductByVendor(product._id, currentUser)
    }
  }


  async getMyProducts(user: User, is_available?: boolean) {
    const currentUser = await this.usersService.getUserByEmail(user.email)
    if (is_available) {

      let myProducts = await this.productModel.find({ 'is_available': is_available, 'vendor': currentUser._id })
      return {
        message: "My Products",
        data: myProducts
      }

    }
    else {
      let myProducts = await this.productModel.find({'vendor': currentUser._id})
      if (!myProducts.length) {
        throw new HttpException("Empty store", HttpStatus.NOT_FOUND)
      }
      return {
        message: "My Products",
        data: myProducts
      }
    }
  }


  async deleteMyProducts(user: User) { 
    const currentUser = await this.usersService.getUserByEmail(user.email)
    await this.productModel.deleteMany({ 'vendor': currentUser._id })
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Products deleted"
    }
  }
  

  async deleteMyProduct(product_id: string, user: User) { 
    const currentUser = await this.usersService.getUserByEmail(user.email)
    await this.productModel.deleteOne({ '_id': product_id, 'vendor': currentUser._id })
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Product deleted"
    }
  }
  

  async getProductsByBuyer() {
    const products = await this.productModel.find({'is_available': true}).populate({ 'path': 'vendor', 'select': '-password -email -username' }) //populate vendor document but exclude password, email, username fields
    if (!products.length) {
      throw new HttpException("No products available", HttpStatus.NOT_FOUND)
    }
    return products
  }


  async getProductByBuyer(){}
}
