import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeModule } from './attribute/attribute.module';
import { AuthModule } from './auth/auth.module';
import { BattleModule } from './battle/battle.module';
import { SuperheroModule } from './superhero/superhero.module';
import { SuperpowerModule } from './superpower/superpower.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-mongodb',
          options: {
            uri: process.env.MONGO_URI,
            collection: 'logs',
          },
        },
      },
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
      signOptions: { expiresIn: '300s' },
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
