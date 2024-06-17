import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTestDatabase } from 'src/helpers/db-tests-helper';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { usersFixtures } from './user.fixtures';

describe('UserService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestDatabase([User])),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  describe('create users', () => {
    it('should create user with valid data', async () => {
      const validAttrs: CreateUserDto = {
        name: 'John Doe',
        bio: 'some bio',
        email: 'someemail@email.com',
        cpf: '12345678900',
        password: '123456',
        profile_picture: 'some_url',
      };
      await userService.create(validAttrs);
      const users = await userService.findAll();

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe(validAttrs.name);
    });

    it('should returns an error if cpf is already registered', async () => {
      const validAttrs: CreateUserDto = {
        name: 'John Doe',
        bio: 'some bio',
        email: 'someemail@email.com',
        cpf: '12345678900',
        password: '123456',
        profile_picture: 'some_url',
      };
      const invalidAttrs: CreateUserDto = {
        ...validAttrs,
        email: 'anotheremail@email.com',
      };
      await userService.create(validAttrs);

      expect(userService.create(invalidAttrs)).rejects.toThrowError();
      expect(userService.findAll()).resolves.toHaveLength(1);
    });

    it('should returns an error if email is already registered', async () => {
      const validAttrs: CreateUserDto = {
        name: 'John Doe',
        bio: 'some bio',
        email: 'someemail@email.com',
        cpf: '12345678900',
        password: '123456',
        profile_picture: 'some_url',
      };
      const invalidAttrs: CreateUserDto = {
        ...validAttrs,
        cpf: '12345678901',
      };
      await userService.create(validAttrs);

      expect(userService.create(invalidAttrs)).rejects.toThrowError();
      expect(userService.findAll()).resolves.toHaveLength(1);
    });
  });

  describe('find all users', () => {
    it('should return all users', async () => {
      const createdUser = await usersFixtures(userService);
      const usersFound = await userService.findAll();
      expect(usersFound).toHaveLength(1);
      expect(usersFound[0].name).toBe(createdUser.name);
      expect(usersFound[0].email).toBe(createdUser.email);
    });
  });

  describe('update user', () => {
    it("should update user's name", async () => {
      const createdUser = await usersFixtures(userService);
      const updatedUser = await userService.update(createdUser.id, {
        ...createdUser,
        name: 'John Doe Updated',
      });
      expect(updatedUser.name).toBe('John Doe Updated');
      expect(userService.findAll()).resolves.toHaveLength(1);
    });

    it('should throw an error if user not found', async () => {
      const createdUser = await usersFixtures(userService);
      expect(userService.update(0, createdUser)).rejects.toThrowError();
      expect(userService.findAll()).resolves.toHaveLength(1);
    });
  });
});
