import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Param, Get, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '../users/users.guard';
import { Request } from 'express';
import { SharesServiceClient,
         SHARES_SERVICE_NAME,
         SHARES_PACKAGE_NAME,
         GetShareResponse,
         GetShareRequest,
         GetCompanyRequest,
         GetCompanyResponse} from './shares.pb';

@Controller('shares')
export class SharesController implements OnModuleInit{
    private svc : SharesServiceClient;

@Inject(SHARES_SERVICE_NAME)
private readonly client: ClientGrpc;

public onModuleInit(): void {
    this.svc = this.client.getService<SharesServiceClient>(SHARES_SERVICE_NAME);
}

@Get('searchcompany')
@UseGuards(AuthGuard)
private async searchCompany(@Query('companyName') companyName: string): Promise<Observable<GetCompanyResponse>> {
    const request: GetCompanyRequest = { name: companyName };
    return this.svc.searchCompany(request); 
    }

@Get('getshares')
@UseGuards(AuthGuard)
private async getShares(@Query('companyId') companyId: string, @Req() req: Request): Promise<Observable<GetShareResponse>> {
    console.log(companyId);
    const userId = req.userId;
    return this.svc.getShare({
        companyId,
        userId
    });
}
}
