"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("./src/users/entities/user.entity");
const roles_entity_1 = require("./src/roles/entities/roles.entity");
const back_pack_entity_1 = require("./src/back-pack/entities/back_pack.entity");
const exercises_entity_1 = require("./src/exercises/entities/exercises.entity");
const childs_entity_1 = require("./src/childs/entities/childs.entity");
const parents_entity_1 = require("./src/parents/entities/parents.entity");
const admin_entity_1 = require("./src/admin/entities/admin.entity");
const typeorm_1 = require("typeorm");
const ClassCategory_1 = require("./src/ClassCategory/ClassCategory");
const Codes_entity_1 = require("./src/mail/PasswordRestCode/entite/Codes.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'medkh',
    database: 'edidact',
    entities: [
        user_entity_1.User,
        back_pack_entity_1.Back_pack,
        roles_entity_1.Roles,
        exercises_entity_1.Exercises,
        childs_entity_1.Childs,
        parents_entity_1.Parents,
        admin_entity_1.Admin,
        ClassCategory_1.ClassCategory,
        Codes_entity_1.Codes,
    ],
    synchronize: true,
    migrationsTableName: 'migrationTable',
    migrations: ['MigrationTable1710848760558'],
};
const dataSource = new typeorm_1.DataSource(exports.databaseConfig);
exports.default = dataSource;
//# sourceMappingURL=database.configue.js.map