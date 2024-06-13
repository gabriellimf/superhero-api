import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Superhero } from './entities/superhero.entity';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { race } from 'rxjs';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
  ) {}

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    const existingSuperhero = await this.superheroRepository.findOneBy({
      superhero_name: createSuperheroDto.superhero_name,
    });
    if (existingSuperhero) {
      throw new BadRequestException('Superhero already exists with this name');
    }

    const superhero = this.superheroRepository.create({
      ...createSuperheroDto,
      gender: { id: createSuperheroDto.gender_id },
      eye_colour: { id: createSuperheroDto.eye_colour_id },
      hair_colour: { id: createSuperheroDto.hair_colour_id },
      skin_colour: { id: createSuperheroDto.skin_colour_id },
      race: { id: createSuperheroDto.race_id },
      publisher: { id: createSuperheroDto.publisher_id },
      alignment: { id: createSuperheroDto.alignment_id },
    });
    try {
      return await this.superheroRepository.save(superhero);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create superhero');
    }
  }

  async findAll(): Promise<Superhero[]> {
    const superheroes = await this.superheroRepository.find();
    if (superheroes.length === 0) {
      throw new NotFoundException('No superheroes found');
    }
    return superheroes;
  }

  async findOne(id: number): Promise<Superhero> {
    const superhero = await this.superheroRepository.findOneBy({ id });
    if (!superhero) {
      throw new NotFoundException('Superhero not found');
    }
    return superhero;
  }

  async update(
    id: number,
    updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<Superhero> {
    const updateResult = await this.superheroRepository.update(
      id,
      updateSuperheroDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException('Superhero not found');
    }
    return this.superheroRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.superheroRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Superhero not found');
    }
  }
}
