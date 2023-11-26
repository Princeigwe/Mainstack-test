import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { Document, SchemaTypes } from "mongoose"
import { User } from '../users/user.schema'
import * as mongoose from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product{

  @Prop({ type: SchemaTypes.String })
  title: string

  @Prop({ type: SchemaTypes.String })
  description: string

  @Prop({ type: SchemaTypes.Number })
  price: number

  @Prop({ type: SchemaTypes.Boolean, default: false })
  is_available: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  vendor: User

}

export const ProductSchema = SchemaFactory.createForClass(Product)