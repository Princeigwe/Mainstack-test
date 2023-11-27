import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.schema';
import {Request} from 'express'


describe('UsersController', () => {
  let controller: UsersController;

  let mockUsersService = {

    myProfile: jest.fn((user: User) => {
      user = {
        first_name : 'test',
        last_name : 'user3',
        email : 'testuser3@gmail.com',
        username : 'testuser3',
        password : 'testpass123'
      }
      return {
        "message": "My Profile",
        "data": {
          "first_name": "test",
          "last_name": "user3",
          "email": "testuser3@gmail.com",
          "username": "testuser3"
      }
    }
    } )

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile', async () => {
    const user = { first_name : 'test', last_name : 'user3', email : 'testuser3@gmail.com', username : 'testuser3', password : 'testpass123' }
    const mockRequest = { body: user } as Request
    expect( await controller.myProfile(mockRequest) ).toEqual( mockUsersService.myProfile(user) )
  })
});
