import { Injectable } from '@nestjs/common';
import {
  RegisterEntity,
  RegisterRepository,
} from '../repositoires/register.repository';
import { CreateRegisterDto } from '../dto/create-register.dto';
import { EntityNotFoundException } from '../../../shared/exceptions/entity-not-found.exception';
import { KidRepository } from '../../kid/repositories/kid.respository';
import { WalletService } from '../../wallet/services/wallet.service';
import { OneChildren } from '../../auth/controllers/parent.controller';

@Injectable()
export class RegisterService {
  constructor(
    private registerRepository: RegisterRepository,
    private kidRepository: KidRepository,
    private walletService: WalletService,
  ) {}

  async movimentation(
    createRegisterDto: CreateRegisterDto,
    kidId: string,
  ): Promise<RegisterEntity> {
    console.log('COMO ESTÁ O KIDID', kidId);
    createRegisterDto.value = Number(createRegisterDto.value);
    const kidFind = await this.kidRepository.findOne(kidId);

    if (!kidFind) {
      throw new EntityNotFoundException(
        'Não foi encontrado um usuário filho para o id informado!',
      );
    }

    console.log('COMO ESTÁ O FILHO', kidFind);

    switch (createRegisterDto.type) {
      case 'Depósito':
        await this.walletService.deposito(
          createRegisterDto.value,
          kidFind.wallet.id,
        );
        break;
      case 'Gasto':
        await this.walletService.gasto(
          createRegisterDto.value,
          kidFind.wallet.id,
        );
        break;
      case 'Guardado':
        await this.walletService.guardar(
          createRegisterDto.value,
          kidFind.wallet.id,
        );
        break;
      case 'Saque':
        await this.walletService.saque(
          createRegisterDto.value,
          kidFind.wallet.id,
        );
        break;
    }

    return this.registerRepository.create(createRegisterDto, kidId);
  }

  async findAll(kidId: string): Promise<OneChildren> {
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
      }));
    }

    return response;
  }

  async findOne(id: string, userId: string): Promise<RegisterEntity> {
    const registerFind = await this.registerRepository.findOne(id, userId);

    if (!registerFind) {
      throw new EntityNotFoundException('Registro não encontrado');
    }

    return registerFind;
  }
}
