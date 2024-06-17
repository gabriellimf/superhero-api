import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

export const usersFixtures = async (userService: UsersService) => {
  const validAttrs: CreateUserDto = {
    name: 'John Doe',
    bio: 'some bio',
    email: 'someemail@email.com',
    cpf: '12345678900',
    password: '123456',
    profile_picture: 'some_url',
  };

  return await userService.create(validAttrs);
};
