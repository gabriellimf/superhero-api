import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Superhero } from '../../superhero/entities/superhero.entity';
import { Superpower } from './superpower.entity';

@Entity({ schema: 'superhero' })
export class HeroPower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Superhero, (superhero) => superhero.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hero_id' })
  hero: Superhero;

  @ManyToOne(() => Superpower, (superpower) => superpower.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'power_id' })
  power: Superpower;
}
