import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  providers: [UsersService],
})
export class UsersModule {}
