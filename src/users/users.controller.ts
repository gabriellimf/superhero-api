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
import { PinoLogger } from 'nestjs-pino';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService, private logger: PinoLogger) {
    this.logger.setContext('UsersController');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
  async index() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async create(@Body() body: CreateUserDto) {
    this.logger.info({ msg: 'Creating new user', email: body.email });
    return await this.usersService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.' })
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.findOneOrFail({
      where: { id },
      select: ['cpf', 'name', 'email', 'profile_picture', 'bio'],
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserDto,
  ) {
    this.logger.info({ msg: 'Updating user', id });
    return await this.usersService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
  async destroy(@Param('id', new ParseIntPipe()) id: number) {
    this.logger.info({ msg: 'Deleting user', id });
    return this.usersService.destroy(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/disable')
  @ApiResponse({ status: 200, description: 'The user has been successfully disabled.' })
  async disableUser(@Param('id', ParseIntPipe) id: number) {
    this.logger.info({ msg: 'Disabling user', id });
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
