import { Controller, Post, Body } from '@nestjs/common';
import { SkinService } from '../services/skin.service';
import { Skin } from '../entities/skin.entity';

@Controller('skins')
export class SkinController {
  constructor(private readonly skinService: SkinService) {}

  @Post()
  async saveSkin(@Body() skinData: Partial<Skin>): Promise<Skin> {
    return this.skinService.saveSkin(skinData);
  }
}
