"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("./src/users/entities/user.entity");
const roles_entity_1 = require("./src/roles/entities/roles.entity");
const back_pack_entity_1 = require("./src/back-pack/entities/back_pack.entity");
const typeorm_1 = require("typeorm");
const Codes_entity_1 = require("./src/mail/PasswordRestCode/entite/Codes.entity");
const childs_entity_1 = require("./src/childs/entities/childs.entity");
const exercises_entity_1 = require("./src/exercises/entities/exercises.entity");
const parents_entity_1 = require("./src/parents/entities/parents.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: 'apidev.edidact.ch',
    port: 5432,
    username: 'edidact_user',
    password: 'edidact_S3cret',
    database: 'edidact_db',
    entities: [user_entity_1.User, back_pack_entity_1.Back_pack, roles_entity_1.Roles, exercises_entity_1.Exercises, childs_entity_1.Children, Codes_entity_1.Codes, parents_entity_1.Parents],
    synchronize: true,
};
const dataSource = new typeorm_1.DataSource(exports.databaseConfig);
exports.default = dataSource;
//# sourceMappingURL=database.configue.js.map