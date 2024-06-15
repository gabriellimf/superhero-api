import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    if (await this.userRepository.findOne({ where: { cpf: user.cpf } })) {
      throw new BadRequestException('CPF or Email already registered');
    }
    
    if (await this.userRepository.findOne({ where: { email: user.email } })) {
      throw new BadRequestException('CPF or Email already registered');
    }
    
    return await this.userRepository.save(user);
  }  

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'cpf', 'name', 'email'],
    });
  }

  async findOneOrFail(options: FindOneOptions<User>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: number) {
    const user = await this.findOneOrFail({ where: { id } });
    return await this.userRepository.remove(user);
  }
}
