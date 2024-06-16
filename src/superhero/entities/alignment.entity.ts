import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Superhero } from './superhero.entity';

@Entity({ schema: 'superhero' })
export class Alignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  alignment: string;

  @OneToMany(() => Superhero, (superhero) => superhero.alignment, { onDelete: 'CASCADE' })
  superheroes: Superhero[];
}
