import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  async login(user) {
    const payload = { sub: user.id }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    let user: User 
    try {
      user = await this.userService.findOneOrFail({ where: { email } });
    } catch (error) {
      return null;
    }

    const isPasswordValid = await compareSync(password, user.password);
    const isEmailValid = user.email === email;
    if (!isPasswordValid || !isEmailValid) return null;
    return user;
  }
}