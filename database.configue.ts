import { User } from './src/users/entities/user.entity';
import { Roles } from './src/roles/entities/roles.entity';
import { Back_pack } from './src/back-pack/entities/back_pack.entity';
import { Exercises } from './src/exercises/entities/exercises.entity';

import { Parents } from './src/parents/entities/parents.entity';
import { Admin } from './src/admin/entities/admin.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Codes } from './src/mail/PasswordRestCode/entite/Codes.entity';
import { Children } from './src/childs/entities/childs.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'apidev.edidact.ch',
  port: 5432,
  username: 'edidact_user',
  password: 'edidact_S3cret',
  database: 'edidact_db',
  entities: [
    User,
    Back_pack,
    Roles,
    Exercises,
    Children,
    Parents,
    Admin,
    Codes,
  ],
  synchronize: true,
};
const dataSource = new DataSource(databaseConfig);
export default dataSource;
