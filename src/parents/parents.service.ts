import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChildDto, UpdateChildDto } from '../childs/dto/create-child';
import { Children, Parents } from './entities/parents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrentDto } from './dto/create-Parent.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../roles/entities/roles.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../auth/jwtConstants';
import * as dns from 'dns';
import * as fs from 'fs';
@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Children)
    private childRepository: Repository<Children>,
    @InjectRepository(Parents)
    private parentsRepository: Repository<Parents>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    private jwtService: JwtService,
  ) {}

  async createParent(createPrentDto: CreatePrentDto): Promise<{
    parent: {
      password: string;
      roleId: number;
      roles: Roles;
      tel: number;
      email: string;
      username: string;
    } & Parents;
    access_token: string;
  }> {
    try {
      const roleId = parseInt(createPrentDto.roleId.toString(), 10);

      // Vérifier si un parent avec la même adresse e-mail existe déjà
      const existingParent = await this.parentsRepository.findOne({
        where: { email: createPrentDto.email },
      });
      if (existingParent) {
        throw new BadRequestException(
          'Un parent avec la même adresse e-mail existe déjà',
        );
      }

      // Vérifier si le rôle existe
      const role = await this.rolesRepository.findOne({
        where: { id: roleId },
      });

      if (!role) {
        throw new NotFoundException(`Rôle avec l'ID ${roleId} non trouvé`);
      }

      const hashedPassword = await bcrypt.hash(createPrentDto.password, 10);
      const parent = await this.parentsRepository.save({
        ...createPrentDto,
        password: hashedPassword,
        roleId,
        roles: role,
      });
      console.log('parent:', parent);
      const payload = {
        email: parent.email,
        sub: parent.id,
        roleName: role.name,
      };

      // Générer un token JWT pour le parent
      const token = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '1h',
      });

      return {
        parent,
        access_token: token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyEmail(email: string): Promise<boolean> {
    // Vérification de l'email avec une expression régulière
    const emailRegex = /^\S+@\S+$/i;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email');
    }

    // Extraction du domaine de l'email
    const domain = email.split('@')[1];

    // Requête DNS pour vérifier le domaine
    return new Promise((resolve, reject) => {
      dns.resolve(domain, 'MX', (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
          reject(new BadRequestException('Invalid domain'));
        } else {
          resolve(true);
        }
      });
    });
  }

  async createChildOrChildren(
    createChildrenDto: CreateChildDto | CreateChildDto[],
    image: Express.Multer.File | null,
  ): Promise<Awaited<Children | Children>[]> {
    try {
      console.log('createChildrenDto:', createChildrenDto);
      const childrenToCreate: CreateChildDto[] = Array.isArray(
        createChildrenDto,
      )
        ? createChildrenDto
        : [createChildrenDto];

      const promises = childrenToCreate.map(async (createChildDto) => {
        const parent = await this.parentsRepository.findOne({
          where: { id: createChildDto.id_parent },
        });
        if (!parent) {
          throw new NotFoundException(
            `Parent with ID ${createChildDto.id_parent} not found`,
          );
        }

        const existingChild = await this.childRepository.findOne({
          where: { username: createChildDto.username },
        });
        if (existingChild) {
          throw new BadRequestException(
            `Child with email ${createChildDto.email} already exists`,
          );
        } else {
          const child = new Children();
          child.username = createChildDto.username;
          child.password = createChildDto.password;
          child.classe = createChildDto.classe;
          child.roleId = createChildDto.roleId;
          child.parents = parent;
          const parentId = createChildDto.id_parent;
          child.email = `${createChildDto.username}${parentId}`;
          if (image) {
            const base64Image = image.buffer.toString('base64');
            child.image = base64Image;
          } else {
            const defaultImage = 'src/parents/uploads/default_child_3.png';
            const defaultImageBuffer = fs.readFileSync(defaultImage);
            child.image = defaultImageBuffer.toString('base64');
          }
          console.log(child);
          return this.childRepository.save(child);
        }
      });

      return await Promise.all(promises);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(idOrUsername: number | string): Promise<Parents | undefined> {
    if (typeof idOrUsername === 'number') {
      return await this.parentsRepository.findOne({
        where: { id: idOrUsername },
      });
    } else {
      return await this.parentsRepository.findOne({
        where: { username: idOrUsername },
      });
    }
  }
  async findOneChild(idOrUsername: number): Promise<Children | undefined> {
    const child = this.childRepository.findOne({
      where: { id: idOrUsername },
    });
    return child;
  }

  async findAllChildren(parentId: number): Promise<Children[]> {
    return await this.childRepository.find({
      where: { parents: { id: parentId } },
    });
  }

  async updateChild(
    id: number,
    updateChildDto: UpdateChildDto,
    image: Express.Multer.File,
  ) {
    const child = await this.childRepository.findOne({ where: { id: id } });
    if (!child) {
      throw new NotFoundException("Child doesn't exist");
    }

    // Vérifier si le prénom est unique
    if (updateChildDto.username && updateChildDto.username !== child.username) {
      const existingChild = await this.childRepository.findOne({
        where: { username: updateChildDto.username },
      });
      if (existingChild) {
        throw new BadRequestException(
          'Le prénom existe déjà pour un autre enfant',
        );
      }
    }

    // Vérifier si l'identifiant (email) est unique
    if (updateChildDto.email && updateChildDto.email !== child.email) {
      const existingChild = await this.childRepository.findOne({
        where: { email: updateChildDto.email },
      });
      if (existingChild) {
        throw new BadRequestException(
          "L'identifiant existe déjà pour un autre enfant",
        );
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
      child.password = await bcrypt.hash(updateChildDto.password, 10);
    }
    return await this.childRepository.save(child);
  }
  //supprimer un child
  async remove(id: number) {
    // Utilisez directement l'ID sans conversion
    const child = await this.childRepository.findOne({ where: { id: id } });

    if (!child) throw new NotFoundException('child not found');
    return await this.childRepository.remove(child);
  }
  async getParentFromToken(token: string): Promise<Parents | null> {
    try {
      // Décodez le token pour obtenir ses informations sans le vérifier
      const decodedToken = this.jwtService.decode(token);
      console.log('decodedToken:', decodedToken);
      if (!decodedToken || !decodedToken.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      // Recherchez le parent dans la base de données en utilisant l'ID extrait du token
      const parent = await this.parentsRepository.findOne({
        where: { id: decodedToken.sub }, // Utilisation de l'ID extrait du token comme condition de sélection
      });

      // Retournez le parent s'il est trouvé, sinon null
      return parent || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new UnauthorizedException('Invalid Parent');
    }
  }

  async findChildrenNames(parentId: number): Promise<string[]> {
    const parent = await this.parentsRepository.findOne({
      where: { id: parentId },
      relations: ['childs'], // Load the related children
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Extract child names from the parent entity
    const childNames = parent.childs.map((child: Children) => child.username);

    return childNames;
  }

  async findChildrenId(parentId: number): Promise<number[]> {
    const parent = await this.parentsRepository.findOne({
      where: { id: parentId },
      relations: ['childs'], // Load the related children
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Extract child names from the parent entity
    const childId = parent.childs.map((child: Children) => child.id);

    return childId;
  }

  async findChildByUsername(
    username: string,
  ): Promise<{ found: boolean; child?: Children }> {
    try {
      const child = await this.childRepository.findOne({
        where: { username },
      });

      if (child) {
        return { found: true, child };
      } else {
        return { found: false };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
