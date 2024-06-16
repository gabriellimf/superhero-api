import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Superpower } from './entities/superpower.entity';
import { CreateSuperpowerDto } from './dto/create-hero-power.dto';
import { UpdateSuperpowerDto } from './dto/update-hero-power.dto';

@Injectable()
export class SuperpowerService {
  constructor(
    @InjectRepository(Superpower)
    private superpowerRepository: Repository<Superpower>,
  ) {}

  async create(createSuperpowerDto: CreateSuperpowerDto): Promise<Superpower> {
    const superpower = new Superpower();
    superpower.power_name = createSuperpowerDto.power_name;
    try {
      return await this.superpowerRepository.save(superpower);
    } catch (error) {
      console.error(error); // Adicione esta linha para logar o erro
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

  async update(id: number, updateSuperpowerDto: UpdateSuperpowerDto): Promise<Superpower> {
    const superpower = await this.findOneOrFail({ where: { id } });
    if (!superpower) {
      throw new NotFoundException('Superpower not found');
    }
    this.superpowerRepository.merge(superpower, updateSuperpowerDto);
    return this.superpowerRepository.save(superpower);
  }

  async remove(id: number): Promise<void> {
    const superpower = await this.findOneOrFail({ where: { id } });
    if (!superpower) {
      throw new NotFoundException('Superpower not found');
    }
    await this.superpowerRepository.remove(superpower);
  }
}