export type KidEntity = {
  id?: string;
  name: string;
  email: string;
  password: string;
  wallet?: {
    id: string;
    savedValue: number;
    amountToSpend: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type KidResponse = {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class KidRepository {
  abstract create(params: KidEntity, parentId: string): Promise<KidResponse>;

  abstract findByEmail(email: string): Promise<KidEntity>;

  abstract findByParentId(parentId: string): Promise<KidEntity[]>;

  abstract findOne(id: string): Promise<KidEntity>;
}
