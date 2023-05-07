import { Injectable } from '@nestjs/common';
import { RegisterEntity, RegisterRepository } from '../register.repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateRegisterDto } from '../../dto/create-register.dto';

@Injectable()
export class PrismaRegisterRepository implements RegisterRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    params: CreateRegisterDto,
    kidId: string,
  ): Promise<RegisterEntity> {
    const result = await this.prisma.register.create({
      // @ts-ignore
      data: {
        description: params.description,
        value: params.value,
        type: params.type,
        kid: {
          connect: {
            id: kidId,
          },
        },
      },
    });

    if (result) {
      // @ts-ignore
      return {
        ...result,
        value: Number(result.value),
      };
    }

    return null;
  }

  async findAll(kidId: string): Promise<RegisterEntity[]> {
    const results = await this.prisma.register.findMany({
      where: {
        kid: {
          id: kidId,
        },
      },
    });

    // @ts-ignore
    return results.map((register) => ({
      ...register,
      value: Number(register.value),
    }));
  }

  async findLastFive(kidId: string): Promise<RegisterEntity[]> {
    const results = await this.prisma.register.findMany({
      where: {
        kid: {
          id: kidId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // @ts-ignore
    return results.map((register) => ({
      ...register,
      value: Number(register.value),
    }));
  }

  async findOne(id: string, kidId: string): Promise<RegisterEntity> {
    const result = await this.prisma.register.findFirst({
      where: {
        id,
        kidId,
      },
    });

    if (result) {
      // @ts-ignore
      return {
        ...result,
        value: Number(result.value),
      };
    }

    return null;
  }
}
