import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule.forRoot()],
            inject: [ConfigService],
            useFactory: async (confingService: ConfigService) => (
                {
                    secret: confingService.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: '100000s' }
                }
            )
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
