import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gender } from './gender.entity';
import { Alignment } from './alignment.entity';
import { Publisher } from './publisher.entity';
import { Colour } from './colour.entity';
import { Race } from './race.entity';

@Entity({ schema: 'superhero' })
export class Superhero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  superhero_name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  full_name: string;

  @ManyToOne(() => Gender, (gender) => gender.superheroes)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToOne(() => Colour, (colour) => colour.superheroes)
  @JoinColumn({ name: 'eye_colour_id' })
  eye_colour: Colour;

  @ManyToOne(() => Colour, (colour) => colour.superheroes)
  @JoinColumn({ name: 'hair_colour_id' })
  hair_colour: Colour;

  @ManyToOne(() => Colour, (colour) => colour.superheroes)
  @JoinColumn({ name: 'skin_colour_id' })
  skin_colour: Colour;

  @ManyToOne(() => Race, (race) => race.superheroes)
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => Publisher, (publisher) => publisher.superheroes)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @ManyToOne(() => Alignment, (alignment) => alignment.superheroes)
  @JoinColumn({ name: 'alignment_id' })
  alignment: Alignment;

  @Column({ type: 'int', nullable: true })
  height_cm: number;

  @Column({ type: 'int', nullable: true })
  weight_kg: number;
}
