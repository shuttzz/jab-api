import { Injectable } from '@nestjs/common';
import { ExistingEntityException } from '../../../shared/exceptions/existing-entity.exception';
import { hash } from 'bcrypt';
import { EntityNotFoundException } from '../../../shared/exceptions/entity-not-found.exception';
import { InvalidConfirmationPasswordException } from '../../../shared/exceptions/invalid-confirmation-password.exception';
import { KidRepository, KidResponse } from '../repositories/kid.respository';
import { CreateKidDto } from '../dto/create-kid.dto';

@Injectable()
export class KidService {
  constructor(private kidRepository: KidRepository) {}
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

  async findOne(id: string): Promise<KidResponse> {
    const userFind = await this.kidRepository.findOne(id);

    if (!userFind) {
      throw new EntityNotFoundException('Usuário não encontrado');
    }

    delete userFind.password;

    return userFind;
  }
}
