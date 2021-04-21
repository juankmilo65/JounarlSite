import {  Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import  config  from "../configuration/config";


@Module({
    imports: [
        JwtModule.registerAsync({
            imports:[ConfigModule.forRoot()],
            inject:[ConfigService],
            useFactory: async (confingService : ConfigService )=> (
                {
                    secret: confingService.get<string>('JWT_SECRET'),
                    signOptions: {expiresIn:'100s'}
                }
            )
                })
    ],
    providers: [AuthService],
    exports:[AuthService]
})
export class AuthModule {}
