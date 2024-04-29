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
exports.ParentsService = void 0;
const common_1 = require("@nestjs/common");
const parents_entity_1 = require("./entities/parents.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const roles_entity_1 = require("../roles/entities/roles.entity");
const bcrypt = require("bcrypt");
const jwtConstants_1 = require("../auth/jwtConstants");
let ParentsService = class ParentsService {
    constructor(childRepository, parentsRepository, rolesRepository, jwtService) {
        this.childRepository = childRepository;
        this.parentsRepository = parentsRepository;
        this.rolesRepository = rolesRepository;
        this.jwtService = jwtService;
    }
    createParent(createPrentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roleId = parseInt(createPrentDto.roleId.toString(), 10);
                const existingParent = yield this.parentsRepository.findOne({
                    where: { username: createPrentDto.username },
                });
                if (existingParent) {
                    throw new common_1.BadRequestException('Parent with the same username already exists');
                }
                // Vérifiez si le rôle existe
                const role = yield this.rolesRepository.findOne({
                    where: { id: roleId },
                });
                if (!role) {
                    throw new common_1.NotFoundException(`Rôle avec l'ID ${roleId} non trouvé`);
                }
                const hashedPassword = yield bcrypt.hash(createPrentDto.password, 10);
                const parent = yield this.parentsRepository.save(Object.assign(Object.assign({}, createPrentDto), { password: hashedPassword, roleId, roles: role }));
                const payload = {
                    username: parent.username,
                    sub: parent.id,
                    roleName: role.name,
                };
                // Générer un token JWT pour le parent
                const token = yield this.jwtService.signAsync(payload, {
                    secret: jwtConstants_1.jwtConstants.secret,
                    expiresIn: '1h',
                });
                return {
                    parent,
                    access_token: token,
                };
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        });
    }
    createChildOrChildren(createChildrenDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const childrenToCreate = Array.isArray(createChildrenDto)
                    ? createChildrenDto
                    : [createChildrenDto];
                const promises = childrenToCreate.map((createChildDto) => __awaiter(this, void 0, void 0, function* () {
                    const existingChild = yield this.childRepository.findOne({
                        where: { username: createChildDto.username },
                    });
                    if (existingChild) {
                        throw new common_1.BadRequestException('Child with the same username already exists');
                    }
                    const parent = yield this.parentsRepository.findOne({
                        where: { id: createChildDto.id_parent },
                    });
                    if (!parent) {
                        throw new common_1.NotFoundException(`Parent with ID ${createChildDto.id_parent} not found`);
                    }
                    const child = new parents_entity_1.Childs();
                    child.username = createChildDto.username;
                    child.email = createChildDto.email;
                    child.password = createChildDto.password;
                    child.classe = createChildDto.classe;
                    child.roleId = createChildDto.roleId;
                    child.parents = parent;
                    if (image) {
                        child.image = image.buffer.toString('base64');
                    }
                    return this.childRepository.save(child);
                }));
                return yield Promise.all(promises);
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        });
    }
    findOne(idOrUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof idOrUsername === 'number') {
                return yield this.parentsRepository.findOne({
                    where: { id: idOrUsername },
                });
            }
            else {
                return yield this.parentsRepository.findOne({
                    where: { username: idOrUsername },
                });
            }
        });
    }
    findOneChild(idOrUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = this.childRepository.findOne({
                where: { id: idOrUsername },
            });
            return child;
        });
    }
    findOneChildusername(idOrUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = this.childRepository.findOne({
                where: { username: idOrUsername },
            });
            return child;
        });
    }
    findAllChildren(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.childRepository.find({
                where: { parents: { id: parentId } },
            });
        });
    }
    updateChild(id, updateChildDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = yield this.childRepository.findOne({ where: { id: id } });
            if (!child) {
                throw new common_1.NotFoundException("Child doesn't exist");
            }
            // Vérifier si le prénom est unique
            if (updateChildDto.username && updateChildDto.username !== child.username) {
                const existingChild = yield this.childRepository.findOne({
                    where: { username: updateChildDto.username },
                });
                if (existingChild) {
                    throw new common_1.BadRequestException('Le prénom existe déjà pour un autre enfant');
                }
            }
            // Vérifier si l'identifiant (email) est unique
            if (updateChildDto.email && updateChildDto.email !== child.email) {
                const existingChild = yield this.childRepository.findOne({
                    where: { email: updateChildDto.email },
                });
                if (existingChild) {
                    throw new common_1.BadRequestException("L'identifiant existe déjà pour un autre enfant");
                }
            }
            // Mettre à jour l'image si elle est fournie
            if (image) {
                updateChildDto.image = image.buffer.toString('base64');
            }
            // Mettre à jour les autres champs
            Object.assign(child, updateChildDto);
            return yield this.childRepository.save(child);
        });
    }
    //supprimer un child
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Utilisez directement l'ID sans conversion
            const child = yield this.childRepository.findOne({ where: { id: id } });
            if (!child)
                throw new common_1.NotFoundException('child not found');
            return yield this.childRepository.remove(child);
        });
    }
    getParentFromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Décodez le token pour obtenir ses informations sans le vérifier
                const decodedToken = this.jwtService.decode(token);
                console.log('decodedToken:', decodedToken);
                if (!decodedToken || !decodedToken.sub) {
                    throw new common_1.UnauthorizedException('Invalid token');
                }
                // Recherchez le parent dans la base de données en utilisant l'ID extrait du token
                const parent = yield this.parentsRepository.findOne({
                    where: { id: decodedToken.sub }, // Utilisation de l'ID extrait du token comme condition de sélection
                });
                // Retournez le parent s'il est trouvé, sinon null
                return parent || null;
            }
            catch (error) {
                console.error('Error decoding token:', error);
                throw new common_1.UnauthorizedException('Invalid Parent');
            }
        });
    }
    findChildrenNames(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.parentsRepository.findOne({
                where: { id: parentId },
                relations: ['childs'], // Load the related children
            });
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
            // Extract child names from the parent entity
            const childNames = parent.childs.map((child) => child.username);
            return childNames;
        });
    }
    findChildrenId(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.parentsRepository.findOne({
                where: { id: parentId },
                relations: ['childs'], // Load the related children
            });
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
            // Extract child names from the parent entity
            const childId = parent.childs.map((child) => child.id);
            return childId;
        });
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parents_entity_1.Childs)),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], ParentsService);
//# sourceMappingURL=parents.service.js.map