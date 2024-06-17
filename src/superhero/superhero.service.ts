import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { Superhero } from './entities/superhero.entity';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Publisher } from './entities/publisher.entity';
import { Colour } from './entities/colour.entity';
import { Race } from './entities/race.entity';
import { Alignment } from './entities/alignment.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
    @InjectRepository(Colour)
    private colourRepository: Repository<Colour>,
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
    @InjectRepository(Alignment)
    private alignmentRepository: Repository<Alignment>,
    @InjectPinoLogger(SuperheroService.name)
    private logger: PinoLogger,
  ) {}

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    const existingSuperhero = await this.superheroRepository.findOneBy({
      superhero_name: createSuperheroDto.superhero_name,
    });
    this.logger.info({
      msg: 'Checking if superhero exists',
      superhero_name: createSuperheroDto.superhero_name,
    });
    if (existingSuperhero) {
      this.logger.error({
        msg: 'Superhero already exists with this name',
        superhero_name: createSuperheroDto.superhero_name,
      });
      throw new BadRequestException('Superhero already exists with this name');
    }

    const gender = await this.genderRepository.findOneBy({
      id: createSuperheroDto.gender_id,
    });
    const eyeColour = await this.colourRepository.findOneBy({
      id: createSuperheroDto.eye_colour_id,
    });
    const hairColour = await this.colourRepository.findOneBy({
      id: createSuperheroDto.hair_colour_id,
    });
    const skinColour = await this.colourRepository.findOneBy({
      id: createSuperheroDto.skin_colour_id,
    });
    const race = await this.raceRepository.findOneBy({
      id: createSuperheroDto.race_id,
    });
    const publisher = await this.publisherRepository.findOneBy({
      id: createSuperheroDto.publisher_id,
    });
    const alignment = await this.alignmentRepository.findOneBy({
      id: createSuperheroDto.alignment_id,
    });

    const superhero = new Superhero();
    superhero.superhero_name = createSuperheroDto.superhero_name;
    superhero.full_name = createSuperheroDto.full_name;
    superhero.gender = gender;
    superhero.eye_colour = eyeColour;
    superhero.hair_colour = hairColour;
    superhero.skin_colour = skinColour;
    superhero.race = race;
    superhero.publisher = publisher;
    superhero.alignment = alignment;
    superhero.height_cm = createSuperheroDto.height_cm;
    superhero.weight_kg = createSuperheroDto.weight_kg;

    try {
      this.logger.info({
        msg: 'Creating new superhero',
        superhero_name: superhero.superhero_name,
      });
      return await this.superheroRepository.save(superhero);
    } catch (error) {
      this.logger.error({
        msg: 'Failed to create superhero',
        error: error.message,
      });
      throw new InternalServerErrorException('Failed to create superhero');
    }
  }

  async findAll(): Promise<Superhero[]> {
    return await this.superheroRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<Superhero>) {
    try {
      return await this.superheroRepository.findOneOrFail({
        relations: [
          'gender',
          'eye_colour',
          'hair_colour',
          'skin_colour',
          'race',
          'publisher',
          'alignment',
        ],
        ...options,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateSuperheroDto: UpdateSuperheroDto) {
    this.logger.warn({ msg: 'You will update this superhero', id });
    const superhero = await this.findOneOrFail({ where: { id } });
    if (!superhero) {
      this.logger.error({ msg: 'Superhero not found', id });
      throw new NotFoundException('Superhero not found');
    }
    this.logger.info({ msg: 'Updating superhero', id });
    this.superheroRepository.merge(superhero, updateSuperheroDto);
    return await this.superheroRepository.save(superhero);
  }

  async remove(id: number) {
    this.logger.warn({ msg: 'You will delete this superhero', id });
    const superhero = await this.findOneOrFail({ where: { id } });
    if (!superhero) {
      this.logger.error({ msg: 'Superhero not found', id });
      throw new NotFoundException('Superhero not found');
    }
    this.logger.info({ msg: 'Deleting superhero', id });
    return await this.superheroRepository.remove(superhero);
  }
}
