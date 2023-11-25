import { Body, Controller, Post, Response, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register.user.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  
  @Post('register')
  async registerUser(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body.first_name, body.last_name, body.email, body.username, body.password)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request, @Response() response) {
    const user = request.user
    const token = await this.authService.createJwt(user.id, user.first_name, user.last_name, user.email, user.username)
    return response.send({ ...user.toObject(), accessToken: token });
  }
}
