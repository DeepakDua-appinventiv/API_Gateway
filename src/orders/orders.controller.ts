import { Controller, Inject, Post, OnModuleInit, UseGuards, Req, Param, Get, Query, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { OrdersServiceClient,
         ORDERS_SERVICE_NAME,
         ORDERS_PACKAGE_NAME,
         BuyShareRequest,
         BuyShareResponse,
         SellShareRequest,
         SellShareResponse,  
         GetInvestmentRequest,
         GetInvestmentResponse} from './orders.pb';  
import { AuthGuard, AuthGuardBody } from 'src/users/users.guard';

@Controller('orders')
export class OrdersController implements OnModuleInit{
    private svc: OrdersServiceClient;

@Inject(ORDERS_SERVICE_NAME)
private readonly client: ClientGrpc;

public onModuleInit(): void {
    this.svc = this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);  
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

}
