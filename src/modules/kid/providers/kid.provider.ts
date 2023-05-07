import { KidRepository } from '../repositories/kid.respository';
import { PrismaKidRepository } from '../repositories/prisma/prisma-kid.repository';

export const kidProvider = [
  {
    provide: KidRepository,
    useClass: PrismaKidRepository,
  },
];
