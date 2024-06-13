import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.findOneOrFail({ 
      where: { id },
      select: ['cpf', 'name', 'email', 'profile_picture', 'bio'],
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await await this.usersService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.destroy(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/disable')
  async disableUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOneOrFail({ where: { id } });
    if (!user.is_active) {
      throw new HttpException('User already inactive', HttpStatus.BAD_REQUEST);
    }
    user.is_active = false;
    user.tokenVersion++;
    await this.usersService.update(id, user);
    return { status: 'User has been disabled' };
  }
}
