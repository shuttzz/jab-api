export type ParentEntity = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ParentResponse = {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class ParentRepository {
  abstract create(params: ParentEntity): Promise<ParentResponse>;

  abstract findByEmail(email: string): Promise<ParentEntity>;

  abstract findOne(id: string): Promise<ParentEntity>;

  abstract update(userEntity: ParentEntity): Promise<void>;

  abstract delete(id: string): Promise<void>;
}
