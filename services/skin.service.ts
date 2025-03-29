import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skin } from '../entities/skin.entity';

@Injectable()
export class SkinService {
  constructor(
    @InjectRepository(Skin)
    private readonly skinRepository: Repository<Skin>,
  ) {}

  async saveSkin(skinData: Partial<Skin>): Promise<Skin> {
    const skin = this.skinRepository.create(skinData);
    return this.skinRepository.save(skin);
  }
}
