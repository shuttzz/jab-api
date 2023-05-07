import { Injectable } from '@nestjs/common';
import { CredentialsDto } from '../dto/credentials.dto';
import {
  ParentRepository,
  ParentResponse,
} from '../repositories/parent.respository';
import { compare } from 'bcrypt';
import { InvalidCredentialsException } from '../../../shared/exceptions/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { KidRepository } from '../../kid/repositories/kid.respository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: ParentRepository,
    private kidRepository: KidRepository,

    private jwtService: JwtService,
  ) {}
  async login(
    credentials: CredentialsDto,
  ): Promise<{ token: string; parent: boolean }> {
    const user = await this.checkCredentials(credentials);
    const token = this.jwtService.sign(
      { id: user.id },
      { expiresIn: process.env.APP_AUTH_EXPIRES_IN, subject: user.id },
    );

    return { token, parent: user.parent };
  }

  private async checkCredentials(
    credentials: CredentialsDto,
  ): Promise<{ id: string; parent: boolean }> {
    const { email, password } = credentials;

    const userFind = await this.userRepository.findByEmail(email);

    let kidFind;

    if (!userFind) {
      kidFind = await this.kidRepository.findByEmail(email);
      if (kidFind) {
        if (await compare(password, kidFind.password)) {
          return { id: kidFind.id, parent: false };
        }
      }
    } else {
      if (await compare(password, userFind.password)) {
        return { id: userFind.id, parent: true };
      }
    }

    throw new InvalidCredentialsException('Usuário/Senha incorretos');
  }
}
