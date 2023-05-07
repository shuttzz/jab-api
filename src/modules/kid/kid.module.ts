import { Module } from '@nestjs/common';
import { kidProvider } from './providers/kid.provider';
import { PrismaService } from '../database/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { KidController } from './controllers/kid.controller';
import { KidService } from './services/kid.service';
import { KidRepository } from './repositories/kid.respository';

@Module({
  controllers: [KidController],
  providers: [...kidProvider, PrismaService, KidService],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [KidRepository],
})
export class KidModule {}
