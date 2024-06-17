import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Superhero } from '../../superhero/entities/superhero.entity';
import { Attribute } from './attribute.entity';

@Entity({ schema: 'superhero' })
export class HeroAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Superhero, superhero => superhero.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hero_id' })
  hero: Superhero;

  @ManyToOne(() => Attribute, attribute => attribute.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column({ type: 'int' })
  attribute_value: number;
}