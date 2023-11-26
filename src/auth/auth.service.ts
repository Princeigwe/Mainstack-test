import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  
  async registerUser(first_name: string, last_name: string, email: string, username: string, password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    let registeredUser = await this.usersService.createUser(first_name, last_name, email, username, hashedPassword)
    return registeredUser
  }


  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email)
    const userHashedPassword = user.password
    const validPassword = bcrypt.compare(password, userHashedPassword)
    if (validPassword) {
      return user
    }
    else {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
    }
  }


  async createJwt(userId: string, first_name: string, last_name: string, email: string, username: string) {
    const payload = {
      userId: userId,
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username
    }
    const token = this.jwtService.sign(payload)
    return token
  }
}
