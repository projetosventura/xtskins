import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SteamService {
  private apiKey = 'YOUR_STEAM_API_KEY'; // Substituir pela sua chave da Steam

  async getUserInventory(steamId: string) {
    const url = `https://api.steampowered.com/IEconItems_730/GetPlayerItems/v1/?key=${this.apiKey}&steamid=${steamId}`;
    const response = await axios.get(url);
    return response.data;
  }
}
