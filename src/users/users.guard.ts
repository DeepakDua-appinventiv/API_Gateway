import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
// import { Request } from 'express';
import { ValidateResponse } from './users.pb';
import { UsersService } from './users.service';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    userId: string;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(UsersService)
  public readonly service: UsersService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: any = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];
    const { status, userId }: ValidateResponse = await this.service.validate(token);
    req.userId = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}


export class AuthGuardBody implements CanActivate {
  @Inject(UsersService)
  public readonly service: UsersService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: any = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];
    const { status, userId } = await this.service.validate(token);
    req.body.userId = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
