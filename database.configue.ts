import { User } from './src/users/entities/user.entity';
import { Roles } from './src/roles/entities/roles.entity';
import { Back_pack } from './src/back-pack/entities/back_pack.entity';
import { Exercises } from './src/exercises/entities/exercises.entity';
import { Childs } from './src/childs/entities/childs.entity';
import { Parents } from './src/parents/entities/parents.entity';
import { Admin } from './src/admin/entities/admin.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ClassCategory } from './src/ClassCategory/ClassCategory';
import { Codes } from './src/mail/PasswordRestCode/entite/Codes.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'medkh',
  database: 'edidact',
  entities: [
    User,
    Back_pack,
    Roles,
    Exercises,
    Childs,
    Parents,
    Admin,
    ClassCategory,
    Codes,
  ],
  synchronize: true,
  migrationsTableName: 'migrationTable',
  migrations: ['MigrationTable1710848760558'],
};
const dataSource = new DataSource(databaseConfig);
export default dataSource;
