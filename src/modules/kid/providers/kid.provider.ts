import { KidRepository } from '../repositories/kid.respository';
import { PrismaKidRepository } from '../repositories/prisma/prisma-kid.repository';
import { RegisterRepository } from '../../register/repositoires/register.repository';
import { PrismaRegisterRepository } from '../../register/repositoires/prisma/prisma-register.repository';

export const kidProvider = [
  {
    provide: KidRepository,
    useClass: PrismaKidRepository,
  },
  {
    provide: RegisterRepository,
    useClass: PrismaRegisterRepository,
  },
];
