import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateSuperpowerDto } from './dto/create-hero-power.dto';
import { UpdateSuperpowerDto } from './dto/update-hero-power.dto';
import { Superpower } from './entities/superpower.entity';

@Injectable()
export class SuperpowerService {
  constructor(
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>,
    @InjectPinoLogger(SuperpowerService.name)
    private readonly logger: PinoLogger,
  ) {}

  async create(createSuperpowerDto: CreateSuperpowerDto): Promise<Superpower> {
    const superpower = new Superpower();
    superpower.power_name = createSuperpowerDto.power_name;
    try {
      this.logger.info({
        msg: 'Creating new superpower',
        power_name: superpower.power_name,
      });
      return await this.superpowerRepository.save(superpower);
    } catch (error) {
      this.logger.error({
        msg: 'Failed to create superpower',
        error: error.message,
      });
      throw new BadRequestException('Failed to create superpower');
    }
  }

  async findAll(): Promise<Superpower[]> {
    return this.superpowerRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<Superpower>) {
    try {
      return await this.superpowerRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException('Superpower not found');
    }
  }

  async update(
    id: number,
    updateSuperpowerDto: UpdateSuperpowerDto,
  ): Promise<Superpower> {
    const superpower = await this.findOneOrFail({ where: { id } });
    this.logger.warn({ msg: 'You will update this superpower', id });
    if (!superpower) {
      this.logger.error({ msg: 'Superpower not found', id });
      throw new NotFoundException('Superpower not found');
    }
    this.logger.info({ msg: 'Updating superpower', id });
    this.superpowerRepository.merge(superpower, updateSuperpowerDto);
    return this.superpowerRepository.save(superpower);
  }

  async remove(id: number): Promise<void> {
    this.logger.warn({ msg: 'You will delete this superpower', id });
    const superpower = await this.findOneOrFail({ where: { id } });
    if (!superpower) {
      throw new NotFoundException('Superpower not found');
    }
    await this.superpowerRepository.remove(superpower);
  }
}
