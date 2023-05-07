import { Kid } from '@prisma/client';

export type WalletEntity = {
  id?: string;
  name: string;
  kid?: Kid;
  savedValue: number;
  amountToSpend: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class WalletRepository {
  abstract update(params: WalletEntity): Promise<void>;

  abstract findOne(id: string): Promise<WalletEntity>;
}
