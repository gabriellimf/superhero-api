import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    cpf: string,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      cpf,
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}
