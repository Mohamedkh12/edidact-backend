"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const roles_entity_1 = require("../roles/entities/roles.entity");
let UsersService = class UsersService {
    constructor(usersRepository, rolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }
    //create compte users
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si createUserDto est un tableau, créez plusieurs utilisateurs en même temps
            if (Array.isArray(createUserDto)) {
                const users = [];
                for (const userDto of createUserDto) {
                    const roleId = parseInt(userDto.roleId.toString(), 10);
                    // Vérifiez si l'utilisateur existe déjà par son nom d'utilisateur
                    const existingUser = yield this.usersRepository.findOne({
                        where: { username: userDto.username },
                    });
                    if (existingUser) {
                        throw new common_1.BadRequestException('Cet utilisateur existe déjà.');
                    }
                    // Vérifiez si le rôle existe
                    const role = yield this.rolesRepository.findOne({
                        where: { id: roleId },
                    });
                    if (!role) {
                        throw new common_1.NotFoundException(`Rôle avec l'ID ${roleId} non trouvé`);
                    }
                    // Créez le nouvel utilisateur
                    const newUser = this.usersRepository.create(Object.assign(Object.assign({}, userDto), { roleId, roles: role }));
                    users.push(newUser);
                }
                // Enregistrez tous les nouveaux utilisateurs
                const savedUsers = yield this.usersRepository.save(users);
                return savedUsers;
            }
            else {
                // Si createUserDto est un objet, créez un seul utilisateur
                const roleId = parseInt(createUserDto.roleId.toString(), 10);
                // Vérifiez si l'utilisateur existe déjà par son nom d'utilisateur
                const existingUser = yield this.usersRepository.findOne({
                    where: { username: createUserDto.username },
                });
                if (existingUser) {
                    throw new common_1.BadRequestException('Cet utilisateur existe déjà.');
                }
                // Vérifiez si le rôle existe
                const role = yield this.rolesRepository.findOne({
                    where: { id: roleId },
                });
                if (!role) {
                    throw new common_1.NotFoundException(`Rôle avec l'ID ${roleId} non trouvé`);
                }
                // Créez le nouvel utilisateur
                const newUser = this.usersRepository.create(Object.assign(Object.assign({}, createUserDto), { roleId, roles: role }));
                // Enregistrez le nouvel utilisateur
                const savedUser = yield this.usersRepository.save(newUser);
                return savedUser;
            }
        });
    }
    //affichage users
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.find();
        });
    }
    //afficher un user
    findOne(idOrUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof idOrUsername === 'number') {
                return this.usersRepository.findOne({ where: { id: idOrUsername } });
            }
            else {
                return this.usersRepository.findOne({
                    where: { username: idOrUsername },
                });
            }
        });
    }
    findOneByusername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOne({
                where: { username: username },
            });
        });
    }
    //update un user
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ where: { id: id } });
            if (!user)
                throw new common_1.NotFoundException();
            Object.assign(user, updateUserDto);
            return this.usersRepository.save(user);
        });
    }
    //supprimer un user
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ where: { id: id } });
            if (!user)
                throw new common_1.NotFoundException();
            return this.usersRepository.remove(user);
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Supprimer tous les utilisateurs
            yield this.usersRepository.delete({});
            // Réinitialiser la séquence
            yield this.usersRepository.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            return {
                message: 'Tous les utilisateurs ont été supprimés et la séquence a été réinitialisée.',
            };
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map