import { UserDto } from '../../modules/users/dto/user.dto';
import { UserEntity } from '../../modules/users/user.entity';

export class UserTransformation {
  EntityToDTO(user: UserEntity): UserDto {
    const userDto = new UserDto();
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    userDto.phone = user.phone;
    userDto.gender = user.gender;
    return userDto;
  }

  DTOToEntity(user: UserDto): UserEntity {
    const userDto = new UserEntity();
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    userDto.phone = user.phone;
    userDto.gender = user.gender;
    return userDto;
  }
}
