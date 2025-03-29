import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skins')
export class Skin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rarity: string;

  @Column()
  price: number;

  @Column({ default: false })
  isForSale: boolean;
}
