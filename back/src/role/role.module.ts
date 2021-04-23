import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './schema/role.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Role', schema: RoleSchema }
        ])
    ]
})
export class RoleModule { }
