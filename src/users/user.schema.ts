import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User{ 
  @Prop({ type: SchemaTypes.String })
  first_name: string

  @Prop({ type: SchemaTypes.String })
  last_name: string

  @Prop({ type: SchemaTypes.String })
  email: string

  @Prop({ type: SchemaTypes.String })
  username: string

  @Prop({ type: SchemaTypes.String })
  password: string
}


export const UserSchema = SchemaFactory.createForClass(User)