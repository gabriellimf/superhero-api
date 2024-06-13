import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('')
export class Comic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  comic_name: string;

  @Column({ type: 'int', nullable: true })
  issue: number;

  @Column({ type: 'int', nullable: true })
  publish_month: number;

  @Column({ type: 'int', nullable: true })
  publish_year: number;
}
