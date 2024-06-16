import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Superhero } from './superhero.entity';

@Entity({ schema: 'superhero' })
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  publisher_name: string;

  @OneToMany(() => Superhero, (superhero) => superhero.publisher, { onDelete: 'CASCADE' })
  superheroes: Superhero[];
}
