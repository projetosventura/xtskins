import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

@Injectable()
export class AuthService {
  private readonly steamApiKey: string;

  constructor() {
    this.steamApiKey = process.env.STEAM_API_KEY || ''; // Load from environment variables
    if (!this.steamApiKey) {
      throw new Error('Steam API Key is not configured');
    }

    passport.use(
      new SteamStrategy(
        {
          returnURL: 'http://localhost:3000/auth/steam/return', // URL de retorno
          realm: 'http://localhost:3000/', // URL do site
          apiKey: this.steamApiKey, // Substituir pela sua chave da Steam
        },
        (identifier, profile, done) => {
          // Callback após autenticação
          return done(null, profile);
        },
      ),
    );
    console.log(this.steamApiKey, 'STEAM API KEY')
    // Serialização e desserialização do usuário
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
  }

  redirectToSteam(req, res, next = () => {}) {
    console.log('Using Steam API Key:', this.steamApiKey);
    passport.authenticate('steam')(req, res, next);
  }

  handleSteamReturn(req, res, next = () => {}) {
    console.log('Using Steam API Key:', this.steamApiKey);
    passport.authenticate('steam', (err, user) => {
      if (err) {
        return res.status(500).send('Erro ao autenticar com a Steam');
      }
      if (!user) {
        return res.status(401).send('Usuário não autenticado');
      }
      res.json(user); // Retorna os dados do usuário autenticado
    })(req, res, next);
  }
}
