import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { AuthMiddleware } from "./middleware/auth.middleware"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (
        {
          type: "mysql",
          host: configService.get<string>("DB_HOST"),
          port: +configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USERNAME"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_DATABASE"),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
          logging: true
        }
      ),
      inject: [ConfigService]
    }),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: "24h"}

    }),
    TodosModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
  exports: [UsersModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/(.*)')
      .forRoutes({
        path: "*",
        method: RequestMethod.ALL
      });
  }
}
