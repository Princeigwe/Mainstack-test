import { ConfigModule } from "@nestjs/config"
export const jwtConstants = {
  config: ConfigModule.forRoot(),
  secret: process.env.JWT_SECRET
}