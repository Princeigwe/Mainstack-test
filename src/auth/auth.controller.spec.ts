import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


describe('AuthController', () => {
  let controller: AuthController;

  let mockAuthService = {
    registerUser: jest.fn((first_name: string, last_name: string, email: string, username: string, password: string) => {
      first_name = 'test'
      last_name = 'user3'
      email = 'testuser3@gmail.com'
      username = 'testuser3'
      password = 'testpass123'
      return {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "username": username,
        "password": password,
        "_id": "12345g",
        "__v": 0
      }
    }),

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return registered user', async () => {
    const user = { first_name: 'test', last_name: 'user3', email: 'testuser3@gmail.com', username: 'testuser3', password: 'testpass123' }
    expect(await controller.registerUser(user)).toEqual(mockAuthService.registerUser('test', 'user3', 'testuser3@gmail.com', 'testuser3', 'testpass123'))
  });
});
