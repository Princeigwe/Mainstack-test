import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ){}


  @UseGuards(JwtAuthGuard)
  @Get('me')
  async myProfile(@Request() request) {
    const user = request.user
    return await this.usersService.myProfile(user)
  }
}
