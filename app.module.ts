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
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables globally
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
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
