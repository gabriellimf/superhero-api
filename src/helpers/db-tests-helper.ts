import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntitySchema, MixedList } from 'typeorm';

type Entity = MixedList<string | Function | EntitySchema<any>>;

export function createTestDatabase(entities: Entity): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    entities,
    logging: false,
  };
}
