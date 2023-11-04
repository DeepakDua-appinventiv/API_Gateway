import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Param, Get, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/users/users.guard';
import { Request } from 'express';
import { SharesServiceClient,
         SHARES_SERVICE_NAME,
         SHARES_PACKAGE_NAME,
         GetShareResponse,
         GetShareRequest} from './shares.pb';

@Controller('shares')
export class SharesController implements OnModuleInit{
    private svc : SharesServiceClient;

@Inject(SHARES_SERVICE_NAME)
private readonly client: ClientGrpc;

public onModuleInit(): void {
    this.svc = this.client.getService<SharesServiceClient>(SHARES_SERVICE_NAME);
}

@Get()
private async getShare(@Query('name') name: GetShareRequest): Promise<Observable<GetShareResponse>> {
    return this.svc.getShare(name); 
    }
}
