import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { User } from '../users/user.schema';
import { Request } from 'express';



describe('ProductsController', () => {
  let controller: ProductsController;

  let mockProductService = {

    addProduct: jest.fn((title: string, description: string, price: number, user: User) => {
      title = "Adjustable table"
      description = "Work at any height and position"
      price = 90000
      
      return {
        "message": "Product added",
        "data": {
            "title": title,
            "description": description,
            "price": price,
            "is_available": false,
            "vendor": "12345g",
            "_id": "54321o",
            "__v": 0
        }
    }
    }),
    
    getProductByVendor: jest.fn((product_id: string, user: User) => {
      product_id = "54321o"
      return {
        "_id": product_id,
        "title": "Adjustable table",
        "description": "Work at any height and position",
        "price": 500,
        "is_available": true,
        "vendor": "12345g",
        "__v": 0
    }
    }),
    
    editProduct: jest.fn((user: User, product_id: string, title?: string, description?: string, price?: number, is_available?: boolean) => {
      title = "Adjustable table"
      description = "Work at any height and position"
      price = 90000
      is_available = false
      product_id = "54321o"

      return {
        "message": "Product Updated",
        "data": {
            "_id": product_id,
            "title": title,
            "description": description,
            "price": price,
            "is_available": is_available,
            "vendor": "12345g",
            "__v": 0
        }
    }
    }),
    
    deleteMyProducts: jest.fn((user: User) => { 
      return {
        "statusCode": 204,
        "message": "Products deleted"
    }
    }),
    
    getProductsByBuyer: jest.fn(() => { 
      return [
        {
            "_id": "54321o",
            "title": "Adjustable table",
            "description": "Work at any height and position",
            "price": 90000,
            "is_available": true,
            "vendor": {
                "_id": "12345g",
                "first_name": "test",
                "last_name": "user3",
                "__v": 0
            },
            "__v": 0
        }
    ]
    }),
    
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService
        }
      ]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return created user product', async () => {
    const body = {
      title : "Adjustable table",
      description : "Work at any height and position",
      price : 90000
    }
    let mockRequest = {} as Request
    const user = { first_name: 'test', last_name: 'user3', email: 'testuser3@gmail.com', username: 'testuser3', password: 'testpass123' }
    expect( await controller.addProduct(body, mockRequest)).toEqual( mockProductService.addProduct(body.title, body.description, body.price, user) )
  });

  it('should return product of current vendor by its id', async () => { 
    const product_id = '54321o'
    const user = { first_name: 'test', last_name: 'user3', email: 'testuser3@gmail.com', username: 'testuser3', password: 'testpass123' }
    let mockRequest = {} as Request
    expect( await controller.getProductByVendor(product_id, mockRequest) ).toEqual( mockProductService.getProductByVendor(product_id, user) )
  });

  it('should return edited product details', async () => { 
    const body = {
      title : "Adjustable table",
      description : "Work at any height and position",
      price : 90000,
      is_available : false,
    }
    const product_id = "54321o"
    let mockRequest = {} as Request
    const user = { first_name: 'test', last_name: 'user3', email: 'testuser3@gmail.com', username: 'testuser3', password: 'testpass123' }
    expect( await controller.editProduct(product_id, mockRequest, body) ).toEqual( mockProductService.editProduct(user, product_id, body.title, body.description) )
  });

  it('should return message of deleted products', async () => { 
    const user = { first_name: 'test', last_name: 'user3', email: 'testuser3@gmail.com', username: 'testuser3', password: 'testpass123' }
    const mockRequest = {} as Request
    expect( await controller.deleteMyProducts(mockRequest) ).toEqual( mockProductService.deleteMyProducts(user) ) 
  });

  it('should return all available products fetched by any user acting as aa buyer', async () => { 
    expect(await controller.getProductsByBuyer()).toEqual(mockProductService.getProductsByBuyer())
  });

});
