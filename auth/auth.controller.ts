import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  steamLogin(@Req() req, @Res() res) {
    return this.authService.redirectToSteam(req, res);
  }

  @Get('steam/return')
  steamReturn(@Req() req, @Res() res) {
    return this.authService.handleSteamReturn(req, res);
  }
}
