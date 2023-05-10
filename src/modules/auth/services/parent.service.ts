import { Injectable } from '@nestjs/common';
import { CreateParentDto } from '../dto/create-parent.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ParentRepository,
  ParentResponse,
} from '../repositories/parent.respository';
import { ExistingEntityException } from '../../../shared/exceptions/existing-entity.exception';
import { hash } from 'bcrypt';
import { EntityNotFoundException } from '../../../shared/exceptions/entity-not-found.exception';
import { InvalidPermissionException } from '../../../shared/exceptions/invalid-permission.exception';
import { InvalidConfirmationPasswordException } from '../../../shared/exceptions/invalid-confirmation-password.exception';
import { Children, OneChildren } from '../controllers/parent.controller';
import { KidRepository } from '../../kid/repositories/kid.respository';
import { RegisterRepository } from '../../register/repositoires/register.repository';

@Injectable()
export class ParentService {
  constructor(
    private userRepository: ParentRepository,
    private kidRepository: KidRepository,
    private registerRepository: RegisterRepository,
  ) {}
  async create(createParentDto: CreateParentDto): Promise<ParentResponse> {
    const userExists = await this.userRepository.findByEmail(
      createParentDto.email,
    );

    if (userExists) {
      throw new ExistingEntityException(
        'Já existe um usuário cadastrado com esse e-mail',
      );
    }

    if (
      createParentDto.password !== undefined &&
      createParentDto.password !== createParentDto.passwordConfirmation
    ) {
      throw new InvalidConfirmationPasswordException('As senhas não conferem');
    } else if (
      createParentDto.password !== undefined &&
      createParentDto.password === createParentDto.passwordConfirmation
    ) {
      createParentDto.password = await hash(createParentDto.password, 8);
    }

    return this.userRepository.create(createParentDto);
  }

  async children(id: string): Promise<Children[]> {
    const children = await this.kidRepository.findByParentId(id);

    let response = [];

    if (children) {
      response = children.map((kid) => ({
        id: kid.id,
        name: kid.name,
        savedValue: kid.wallet.savedValue,
        amountToSpend: kid.wallet.amountToSpend,
      }));
    }

    return response;
  }

  async oneKid(kidId: string): Promise<OneChildren> {
    const kid = await this.kidRepository.findOne(kidId);
    const movimentations = await this.registerRepository.findLastFive(kidId);

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFind = await this.userRepository.findOne(id);
    if (!userFind) {
      throw new EntityNotFoundException('usuário não cadastrado');
    }

    const userExists = await this.userRepository.findByEmail(
      updateUserDto.email,
    );

    if (userExists !== null && userExists.id !== id) {
      throw new InvalidPermissionException(
        'Você não tem permissão para alterar dados de outro usuário',
      );
    }

    if (updateUserDto.password !== undefined) {
      updateUserDto.password = await hash(updateUserDto.password, 8);
    }

    await this.userRepository.update({
      id: userFind.id,
      password: updateUserDto.password || userFind.password,
      email: updateUserDto.email,
      name: updateUserDto.name,
    });
  }

  async remove(id: string): Promise<void> {
    const userExists = await this.userRepository.findOne(id);

    if (!userExists) {
      throw new EntityNotFoundException('Usuário não encontrado');
    }

    await this.userRepository.delete(id);
  }
}
