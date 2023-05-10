import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../repositories/wallet.repository';
import { BadRequestException } from '../../../shared/exceptions/bad-request.exception';

@Injectable()
export class WalletService {
  constructor(private repository: WalletRepository) {}

  async guardar(value: number, id: string): Promise<void> {
    const walletFind = await this.repository.findOne(id);

    if (walletFind.amountToSpend < value) {
      throw new BadRequestException('Saldo insuficiente!');
    }

    walletFind.amountToSpend -= value;
    walletFind.savedValue += value;

    await this.repository.update(walletFind);
  }

  async deposito(value: number, id: string): Promise<void> {
    const walletFind = await this.repository.findOne(id);

    walletFind.amountToSpend += value;

    await this.repository.update(walletFind);
  }

  async saque(value: number, id: string): Promise<void> {
    const walletFind = await this.repository.findOne(id);

    if (walletFind.savedValue < value) {
      throw new BadRequestException('Saldo insuficiente!');
    }

    walletFind.savedValue -= value;
    walletFind.amountToSpend += value;

    await this.repository.update(walletFind);
  }

  async gasto(value: number, id: string): Promise<void> {
    const walletFind = await this.repository.findOne(id);

    if (walletFind.amountToSpend < value) {
      throw new BadRequestException('Saldo insuficiente!');
    }

    walletFind.amountToSpend -= value;

    await this.repository.update(walletFind);
  }
}
