import { Injectable } from '@nestjs/common';
import * as SteamAuth from 'steam-auth';

@Injectable()
export class AuthService {
  private steam = new SteamAuth({
    realm: 'http://localhost:3000/', // URL do site
    returnUrl: 'http://localhost:3000/auth/steam/return', // URL de retorno
    apiKey: 'YOUR_STEAM_API_KEY', // Substituir pela sua chave da Steam
  });

  redirectToSteam(req, res) {
    this.steam.authenticate(req, res);
  }

  async handleSteamReturn(req, res) {
    try {
      const user = await this.steam.verify(req);
      res.json(user); // Retorna os dados do usuário autenticado
    } catch (err) {
      res.status(500).send('Erro ao autenticar com a Steam');
    }
  }
}
