import { Injectable } from '@nestjs/common';
import { WalletEntity, WalletRepository } from '../wallet.repository';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  constructor(private prisma: PrismaService) {}

  async update(params: WalletEntity): Promise<void> {
    await this.prisma.wallet.update({
      where: {
        id: params.id,
      },
      data: {
        amountToSpend: params.amountToSpend,
        savedValue: params.savedValue,
      },
    });
  }

  async findOne(id: string): Promise<WalletEntity> {
    const result = await this.prisma.wallet.findUnique({
      where: {
        id,
      },
    });

    return {
      ...result,
      savedValue: Number(result.savedValue),
      amountToSpend: Number(result.amountToSpend),
    };
  }
}
