import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
import { from, Observable, of } from 'rxjs';
import { LoginDTO } from 'src/user/dto/login.dto';
import { User } from 'src/user/interfaces/User';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    generateJWT(login: LoginDTO): Observable<string> {
        return from(this.jwtService.signAsync({ login }));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12) as any);
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<boolean> {
        return of<boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
