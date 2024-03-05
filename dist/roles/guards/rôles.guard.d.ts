import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { AccessContorlService } from '../shared/access-control.service';
import { Reflector } from '@nestjs/core';
export declare class TokenDto {
    id: number;
    role: Role;
}
export declare class RolesGuard implements CanActivate {
    private reflector;
    private accessControlService;
    constructor(reflector: Reflector, accessControlService: AccessContorlService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export { AccessContorlService };
