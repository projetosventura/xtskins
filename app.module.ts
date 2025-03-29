import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SteamModule } from './steam/steam.module';
import { StripeModule } from './stripe/stripe.module';
import { Skin } from './entities/skin.entity';
import { SkinController } from './controllers/skin.controller';
import { SkinService } from './services/skin.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'your_username',
      password: 'your_password',
      sid: 'your_sid',
      database: 'your_database',
      entities: [Skin],
      synchronize: true, // Não use em produção
    }),
    TypeOrmModule.forFeature([Skin]),
    AuthModule,
    SteamModule,
    StripeModule,
  ],
  controllers: [SkinController],
  providers: [SkinService],
})
export class AppModule {}
