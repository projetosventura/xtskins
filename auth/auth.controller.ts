import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  steamLogin(@Req() req, @Res() res, next) {
    return this.authService.redirectToSteam(req, res, next);
  }

  @Get('steam/return')
  steamReturn(@Req() req, @Res() res, next) {
    return this.authService.handleSteamReturn(req, res, next);
  }
}
