import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from './interface/Role';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService,) { }

    @Get('/getRoles')
    getRoles(): Observable<Role[]> {
        return this.roleService.getRoless();
    }
}