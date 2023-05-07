import { ParentEntity } from '../../auth/repositories/parent.respository';
import { CreateRegisterDto } from '../dto/create-register.dto';

export type RegisterEntity = {
  id?: string;
  description: string;
  value: number;
  type: string;
  kid: ParentEntity;
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class RegisterRepository {
  abstract create(
    params: CreateRegisterDto,
    kidId: string,
  ): Promise<RegisterEntity>;

  abstract findOne(id: string, userId: string): Promise<RegisterEntity>;

  abstract findAll(userId: string): Promise<RegisterEntity[]>;

  abstract findLastFive(userId: string): Promise<RegisterEntity[]>;
}
