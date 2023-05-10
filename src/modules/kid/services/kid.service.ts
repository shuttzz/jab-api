import { Injectable } from '@nestjs/common';
import { ExistingEntityException } from '../../../shared/exceptions/existing-entity.exception';
import { hash } from 'bcrypt';
import { EntityNotFoundException } from '../../../shared/exceptions/entity-not-found.exception';
import { InvalidConfirmationPasswordException } from '../../../shared/exceptions/invalid-confirmation-password.exception';
import { KidRepository, KidResponse } from '../repositories/kid.respository';
import { CreateKidDto } from '../dto/create-kid.dto';
import { RegisterRepository } from '../../register/repositoires/register.repository';
import { OneChildren } from '../../auth/controllers/parent.controller';

@Injectable()
export class KidService {
  constructor(
    private kidRepository: KidRepository,
    private registerRepository: RegisterRepository,
  ) {}
  async create(
    createKidDto: CreateKidDto,
    parentId: string,
  ): Promise<KidResponse> {
    const userExists = await this.kidRepository.findByEmail(createKidDto.email);

    if (userExists) {
      throw new ExistingEntityException(
        'Já existe um usuário cadastrado com esse e-mail',
      );
    }

    if (
      createKidDto.password !== undefined &&
      createKidDto.password !== createKidDto.passwordConfirmation
    ) {
      throw new InvalidConfirmationPasswordException('As senhas não conferem');
    } else if (
      createKidDto.password !== undefined &&
      createKidDto.password === createKidDto.passwordConfirmation
    ) {
      createKidDto.password = await hash(createKidDto.password, 8);
    }

    return this.kidRepository.create(createKidDto, parentId);
  }

  async findOne(id: string): Promise<OneChildren> {
    const kid = await this.kidRepository.findOne(id);
    const movimentations = await this.registerRepository.findLastFive(id);

    const response = {
      id: kid.id,
      name: kid.name,
      savedValue: kid.wallet.savedValue,
      amountToSpend: kid.wallet.amountToSpend,
      movimentations: [],
    };

    if (movimentations) {
      response.movimentations = movimentations.map((movimentation) => ({
        id: movimentation.id,
        createdAt: movimentation.createdAt,
        value: movimentation.value,
        type: movimentation.type,
        description: movimentation.description,
      }));
    }

    return response;
  }
}
