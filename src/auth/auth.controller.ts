import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register.user.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  
  @Post('register')
  async registerUser(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body.first_name, body.last_name, body.email, body.username, body.password)
  }
}
