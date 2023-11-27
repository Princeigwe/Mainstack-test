import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';


describe('ProductsService', () => {
  let service: ProductsService;

  function mockProductModel(dto: any) {
    this.data = dto
    this.save = () => {return this.data}
  }

  let mockUsersService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: mockProductModel
        },
        {
          provide: UsersService,
          useValue: mockUsersService
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
