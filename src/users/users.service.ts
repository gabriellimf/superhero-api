import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
  ) {}

  async create(data: CreateUserDto) {
    try {
      this.logger.info({ msg: 'Checking if user exists', cpf: data.cpf });
      if (await this.userRepository.findOne({ where: { cpf: data.cpf } })) {
        this.logger.error({ msg: 'CPF already registered', cpf: data.cpf });
        throw new BadRequestException('CPF already registered');
      }
      this.logger.info({ msg: 'Saving new user', cpf: data.cpf });
      return await this.userRepository.save(data);
    } catch (e) {
      this.logger.error({
        msg: 'Failed to create user',
        cpf: data.cpf,
        error: e.message,
      });
      throw e;
    }
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
      this.logger.error({ msg: 'User not found', error: error.message });
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });
    this.logger.info({ msg: 'Updating user', id });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: number) {
    const user = await this.findOneOrFail({ where: { id } });
    this.logger.info({ msg: 'Deleting user', id });
    return await this.userRepository.remove(user);
  }
}
