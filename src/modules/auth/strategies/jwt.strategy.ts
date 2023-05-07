import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InvalidCredentialsException } from '../../../shared/exceptions/invalid-credentials.exception';
import {
  ParentRepository,
  ParentResponse,
} from '../repositories/parent.respository';
import { KidRepository } from '../../kid/repositories/kid.respository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private parentRepository: ParentRepository,
    private kidRepository: KidRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_AUTH_SECRET,
    });
  }

  async validate(payload: { id: string }): Promise<ParentResponse> {
    const { id } = payload;
    const parentFind = await this.parentRepository.findOne(id);
    let kidFind;

    if (!parentFind) {
      kidFind = await this.kidRepository.findOne(id);

      if (!kidFind) {
        throw new InvalidCredentialsException(
          'Acesso negado, nenhum usuário encontrado com essas informações',
        );
      } else {
        return kidFind;
      }
    }

    return parentFind;
  }
}
