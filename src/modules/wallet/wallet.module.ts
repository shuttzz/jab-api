import { Module } from '@nestjs/common';
import { walletProvider } from './providers/wallet.provider';
import { WalletService } from './services/wallet.service';
import { PrismaService } from '../database/prisma.service';
import { WalletRepository } from './repositories/wallet.repository';

@Module({
  providers: [...walletProvider, WalletService, PrismaService],
  exports: [WalletService, WalletRepository],
})
export class WalletModule {}
