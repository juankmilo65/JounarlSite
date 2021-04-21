import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { LoginDTO } from 'src/user/dto/login.dto';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    generateJWT(login: LoginDTO):Observable<string>{
        return from(this.jwtService.sign(JSON.parse(JSON.stringify(login))));
    }

    hashPassword(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12) as any); 
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<any |boolean>{
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
