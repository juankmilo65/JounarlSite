import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from './interface/Role';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel('Role') private readonly roleModel: Model<Role>
    ) { }

    getRoless(): Observable<Role[]> {
        return from(this.roleModel.find()).pipe(
            map((roles: Role[]) => {
                return roles;
            })
        )
    }
}