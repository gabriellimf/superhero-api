import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HeroPower } from '../entities/hero_power.entity';

@Entity({ schema: 'superhero' })
export class Superpower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  power_name: string;

  @OneToMany(() => HeroPower, (hero_power) => hero_power.power, { onDelete: 'CASCADE' })
  heroPowers: HeroPower[];
}
