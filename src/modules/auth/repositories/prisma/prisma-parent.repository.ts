import { PrismaService } from '../../../database/prisma.service';
import {
  ParentEntity,
  ParentRepository,
  ParentResponse,
} from '../parent.respository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaParantRepository implements ParentRepository {
  constructor(private prisma: PrismaService) {}
  async create(params: ParentEntity): Promise<ParentResponse> {
    return this.prisma.parent.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findByEmail(email: string): Promise<ParentEntity> {
    return this.prisma.parent.findFirst({
      where: {
        email,
      },
    });
  }

  async findOne(id: string): Promise<ParentEntity> {
    return this.prisma.parent.findUnique({
      where: {
        id,
      },
    });
  }

  async update(parentEntity: ParentEntity): Promise<void> {
    await this.prisma.parent.update({
      where: {
        id: parentEntity.id,
      },
      data: {
        name: parentEntity.name,
        email: parentEntity.email,
        password: parentEntity.password,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.parent.delete({
      where: {
        id,
      },
    });
  }
}
