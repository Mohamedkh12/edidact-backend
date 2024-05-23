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
const dns = require("dns");
const user_entity_1 = require("../users/entities/user.entity");
const role_enum_1 = require("../roles/enums/role.enum");
const fs = require("fs");
let ParentsService = class ParentsService {
    constructor(childRepository, parentsRepository, rolesRepository, userRepository, jwtService) {
        this.childRepository = childRepository;
        this.parentsRepository = parentsRepository;
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    createParent(createParentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si un parent avec la même adresse e-mail existe déjà
                const existingParent = yield this.userRepository.findOne({
                    where: { email: createParentDto.email },
                });
                if (existingParent) {
                    throw new common_1.BadRequestException('Un parent avec la même adresse e-mail existe déjà');
                }
                // Récupérer le rôle parent
                const parentRole = yield this.rolesRepository.findOne({
                    where: { name: role_enum_1.Role.Parent },
                });
                // Hacher le mot de passe
                const hashedPassword = createParentDto.password;
                // Créer l'utilisateur
                const user = this.userRepository.create({
                    username: createParentDto.username,
                    email: createParentDto.email,
                    password: hashedPassword,
                    roleId: parentRole.id,
                });
                // Enregistrer l'utilisateur
                const savedUser = yield this.userRepository.save(user);
                // Créer le parent en utilisant l'identifiant de l'utilisateur
                const parent = new parents_entity_1.Parents();
                parent.username = createParentDto.username;
                parent.tel = createParentDto.tel;
                parent.password = hashedPassword;
                parent.email = createParentDto.email;
                parent.user = savedUser;
                // Enregistrer le parent
                const savedParent = yield this.parentsRepository.save(parent);
                // Créer le payload du token JWT
                const payload = {
                    email: savedParent.email,
                    sub: savedParent.id,
                    id: savedParent.user.id,
                    roleName: parentRole.name,
                };
                // Générer le token JWT
                const token = yield this.jwtService.signAsync(payload, {
                    secret: jwtConstants_1.jwtConstants.secret,
                    expiresIn: '1h',
                });
                // Retourner l'entité parent et le token JWT
                return {
                    parent: savedParent,
                    access_token: token,
                };
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        });
    }
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vérification de l'email avec une expression régulière
            const emailRegex = /^\S+@\S+$/i;
            if (!emailRegex.test(email)) {
                throw new common_1.BadRequestException('Invalid email');
            }
            // Extraction du domaine de l'email
            const domain = email.split('@')[1];
            // Requête DNS pour vérifier le domaine
            return new Promise((resolve, reject) => {
                dns.resolve(domain, 'MX', (err, addresses) => {
                    if (err || !addresses || addresses.length === 0) {
                        reject(new common_1.BadRequestException('Invalid domain'));
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    createChildOrChildren(createChildrenDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const childrenToCreate = Array.isArray(createChildrenDto)
                    ? createChildrenDto
                    : [createChildrenDto];
                const promises = childrenToCreate.map((createChildDto) => __awaiter(this, void 0, void 0, function* () {
                    const parent = yield this.parentsRepository.findOne({
                        where: { id: createChildDto.id_parent },
                        relations: ['children'],
                    });
                    if (!parent) {
                        throw new common_1.NotFoundException(`Parent with ID ${createChildDto.id_parent} not found`);
                    }
                    const childRole = yield this.rolesRepository.findOne({
                        where: { name: role_enum_1.Role.Child },
                    });
                    if (!childRole) {
                        throw new common_1.NotFoundException(`Rôle "Child" non trouvé`);
                    }
                    const existingChild = yield this.userRepository.findOne({
                        where: { email: createChildDto.email },
                    });
                    if (existingChild) {
                        throw new common_1.BadRequestException(`Child with email ${createChildDto.email} already exists`);
                    }
                    // Créer un utilisateur dans le tableau users avec le rôle "Child"
                    const hashedPassword = createChildDto.password;
                    const user = this.userRepository.create({
                        username: createChildDto.username,
                        email: createChildDto.email,
                        password: hashedPassword,
                        roleId: childRole.id,
                    });
                    const savedUser = yield this.userRepository.save(user);
                    // Créer un enfant dans le tableau children
                    const child = new parents_entity_1.Children();
                    child.username = createChildDto.username;
                    child.classe = createChildDto.classe;
                    child.password = hashedPassword;
                    child.parents = parent;
                    child.email = createChildDto.email;
                    child.user = savedUser;
                    if (image) {
                        child.image = image.buffer.toString('base64');
                    }
                    else {
                        const defaultImage = fs.readFileSync('src/parents/uploads/default_child_3.png');
                        child.image = defaultImage.toString('base64');
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
                return yield this.userRepository.findOne({
                    where: { id: idOrUsername },
                });
            }
            else {
                return yield this.userRepository.findOne({
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
    findAllChildren(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.childRepository.find({
                where: { parents: { id: parentId } },
            });
        });
    }
    updateChild(id, updateChildDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = yield this.childRepository.findOne({
                where: { id: id },
                relations: ['parents', 'user'],
            });
            if (!child) {
                throw new common_1.NotFoundException("Child doesn't exist");
            }
            // Vérifier si l'identifiant (email) est unique
            if (updateChildDto.email && updateChildDto.email !== child.email) {
                const existingChild = yield this.userRepository.findOne({
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
            if (updateChildDto.password) {
                // Hasher le nouveau mot de passe
                child.password = yield bcrypt.hash(updateChildDto.password, 10);
            }
            // Synchroniser les modifications dans le tableau users
            const user = child.user;
            if (!user) {
                throw new common_1.NotFoundException("User doesn't exist for this child");
            }
            Object.assign(user, updateChildDto);
            if (updateChildDto.password) {
                user.password = child.password;
            }
            yield this.childRepository.save(child);
            yield this.userRepository.save(user);
            return child;
        });
    }
    //supprimer un child
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = yield this.childRepository.findOne({
                where: { id: id },
                relations: ['parents', 'user'],
            });
            if (!child) {
                throw new common_1.NotFoundException('Child not found');
            }
            const parent = child.parents;
            const user = child.user; // Récupérer le user associé à l'enfant
            if (!parent) {
                throw new common_1.NotFoundException("Associated parent doesn't exist");
            }
            // Supprimer l'enfant
            yield this.childRepository.remove(child);
            // Supprimer le user associé à l'enfant
            if (user) {
                yield this.userRepository.remove(user);
            }
            // Retourner le parent (ce n'est pas nécessaire de supprimer le parent ici)
            return parent;
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
                    where: { id: decodedToken.sub },
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
                relations: ['children'],
            });
            console.log(parent);
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
            // Extract child names from the parent entity
            const childNames = parent.children.map((child) => child.username);
            return childNames;
        });
    }
    findChildrenId(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.parentsRepository.findOne({
                where: { id: parentId },
                relations: ['children'],
            });
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
            // Extract child names from the parent entity
            const childId = parent.children.map((child) => child.id);
            return childId;
        });
    }
    findChildByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const child = yield this.childRepository.findOne({
                    where: { username },
                });
                if (child) {
                    return { found: true, child };
                }
                else {
                    return { found: false };
                }
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        });
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parents_entity_1.Children)),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], ParentsService);
//# sourceMappingURL=parents.service.js.map