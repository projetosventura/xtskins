import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      synchronize: true, // Automatically sync database schema (use cautiously in production)
    }),
    TypeOrmModule.forFeature([Skin]),
    AuthModule,
    SteamModule,
    // StripeModule,
  ],
  controllers: [SkinController],
  providers: [SkinService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    // Verifica a Steam API Key
    const steamApiKey = this.configService.get<string>('STEAM_API_KEY');
    if (!steamApiKey) {
      throw new Error('Steam API Key is not configured in the environment variables');
    }
    console.log('Steam API Key loaded successfully:', steamApiKey);

    // Verifica a Stripe API Key (opcional)
    const stripeApiKey = this.configService.get<string>('STRIPE_API_KEY');
    if (!stripeApiKey) {
      console.warn('Stripe API Key is not configured. Stripe module will not be fully functional.');
    } else {
      console.log('Stripe API Key loaded successfully:', stripeApiKey);
    }
  }
}