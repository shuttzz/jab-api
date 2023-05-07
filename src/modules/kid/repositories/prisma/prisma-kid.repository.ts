import { PrismaService } from '../../../database/prisma.service';
import { KidEntity, KidRepository, KidResponse } from '../kid.respository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaKidRepository implements KidRepository {
  constructor(private prisma: PrismaService) {}
  async create(params: KidEntity, parentId: string): Promise<KidResponse> {
    return this.prisma.kid.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
        parent: {
          connect: {
            id: parentId,
          },
        },
        wallet: {
          create: {
            name: params.name,
            savedValue: 0,
            amountToSpend: 0,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findByEmail(email: string): Promise<KidEntity> {
    return this.prisma.kid.findFirst({
      where: {
        email,
      },
    });
  }

  async findByParentId(id: string): Promise<KidEntity[]> {
    const results = await this.prisma.kid.findMany({
      where: {
        parentId: id,
      },
      include: {
        wallet: true,
      },
    });

    // @ts-ignore
    return results.map((kid) => ({
      ...kid,
      wallet: {
        savedValue: Number(kid.wallet.savedValue),
        amountToSpend: Number(kid.wallet.amountToSpend),
      },
    }));
  }

  async findOne(id: string): Promise<KidEntity> {
    const result = await this.prisma.kid.findUnique({
      where: {
        id,
      },
      include: {
        wallet: true,
      },
    });

    // @ts-ignore
    return {
      ...result,
      wallet: {
        id: result.wallet.id,
        savedValue: Number(result.wallet.savedValue),
        amountToSpend: Number(result.wallet.amountToSpend),
      },
    };
  }
}
