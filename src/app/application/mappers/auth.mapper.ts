import { AuthResponse } from '../dto/auth.dto';
import { User } from '../../domain/entities/user.entity';

export class AuthMapper {
  static toEntity(dto: AuthResponse): User {
    return new User(
      dto.id,
      dto.email,
      dto.role,
      dto.status,
      dto.accessToken,
      dto.refreshToken,
      new Date(dto.expireAt)
    );
  }
}
