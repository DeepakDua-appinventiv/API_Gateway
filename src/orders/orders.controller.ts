import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Param, Get, Query, Body, Res } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { Request } from 'express';
import { OrdersServiceClient,
         ORDERS_SERVICE_NAME,
         ORDERS_PACKAGE_NAME,
         BuyShareRequest,
         BuyShareResponse,
         SellShareRequest,
         SellShareResponse,  
         GetInvestmentRequest,
         GetInvestmentResponse,
         SubmitAgreementRequest,
         SubmitAgreementResponse} from './orders.pb';  
import { AuthGuard, AuthGuardBody } from 'src/users/users.guard';
import * as path from 'path';

@Controller('orders')
export class OrdersController implements OnModuleInit{
    private svc: OrdersServiceClient;

@Inject(ORDERS_SERVICE_NAME)
private readonly client: ClientGrpc;

public onModuleInit(): void {
    this.svc = this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);  
}

@Post('submitAgreement')
// @UseGuards(AuthGuardBody)
private async submitAgreement(@Body() body: SubmitAgreementRequest): Promise<Observable<SubmitAgreementResponse>>{
    return this.svc.submitAgreement(body);
}

@Post('buy')
@UseGuards(AuthGuardBody)
private async buyshare(@Body() body: BuyShareRequest): Promise<Observable<BuyShareResponse>>{
    return this.svc.buyShare(body);
}

@Get('investment')
@UseGuards(AuthGuard)
private async getMyInvestment(@Req() req: GetInvestmentRequest): Promise<Observable<GetInvestmentResponse>>{
    return this.svc.getMyInvestment(req);
}

@Post('sell')
@UseGuards(AuthGuardBody)
private async sellShare(@Body() body: SellShareRequest): Promise<Observable<SellShareResponse>>{
    return this.svc.sellShare(body);
}

@Get()
async getAgreementForm(@Res() res: any) {
    try {
    const templatePath = path.join('/home/admin446/Desktop/stock_market_app/order-management/src/utils/templates/agreementForm.html');

    const formContent = fs.readFileSync(templatePath, 'utf-8');

    res.send(formContent);
    } catch (error) {
        console.log(error);
        
      res.status(500).send('Error serving the form');
    }
  }

}
