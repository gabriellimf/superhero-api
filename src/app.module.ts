import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { SuperheroModule } from './superhero/superhero.module';
import { AuthModule } from './auth/auth.module';
import { SuperpowerModule } from './superpower/superpower.module';
import { AttributeModule } from './attribute/attribute.module';
import { BattleModule } from './battle/battle.module';
import { PinoLogger, LoggerModule } from 'nestjs-pino';
import * as pino from 'pino';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-mongodb',
          options: {
            uri: process.env.MONGO_URI,
            collection: 'logs'
          }
        }
      }
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      schema: 'superhero',
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
    SuperheroModule,
    AuthModule,
    SuperpowerModule,
    AttributeModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
