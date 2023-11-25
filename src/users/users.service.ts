import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }
  

  async createUser(first_name: string, last_name: string, email: string, username: string, password: string) {
    let existing_user = await this.userModel.findOne({ email: email }).exec() || await this.userModel.findOne({ username: username }).exec()
    if (existing_user) {
      throw new HttpException( "User with email/username already exists", HttpStatus.BAD_REQUEST )
    }
    const user = await this.userModel.create({ first_name: first_name, last_name: last_name, email: email, username: username, password: password })
    user.save()
    return user
  }


  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email })
    if (!user) {
      throw new NotFoundException("User does not exist")
    }
    return user
  }
}
