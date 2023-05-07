import { Module } from '@nestjs/common';
import { RegisterService } from './services/register.service';
import { registerProvider } from './providers/register.provider';
import { RegisterController } from './controllers/register.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../database/prisma.service';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/services/wallet.service';
import { KidModule } from '../kid/kid.module';
import { RegisterRepository } from './repositoires/register.repository';

@Module({
  providers: [
    ...registerProvider,
    RegisterService,
    PrismaService,
    WalletService,
  ],
  controllers: [RegisterController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    WalletModule,
    KidModule,
  ],
  exports: [RegisterRepository],
})
export class RegisterModule {}
