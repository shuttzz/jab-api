import { ParentRepository } from '../repositories/parent.respository';
import { PrismaParantRepository } from '../repositories/prisma/prisma-parent.repository';
import { KidRepository } from '../../kid/repositories/kid.respository';
import { PrismaKidRepository } from '../../kid/repositories/prisma/prisma-kid.repository';

export const authProvider = [
  {
    provide: ParentRepository,
    useClass: PrismaParantRepository,
  },
  {
    provide: KidRepository,
    useClass: PrismaKidRepository,
  },
];
