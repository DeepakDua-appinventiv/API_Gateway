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
         SellShareResponse  } from './orders.pb';  
import { AuthGuardBody } from 'src/users/users.guard';

@Controller('orders')
export class OrdersController implements OnModuleInit{
    private svc: OrdersServiceClient;

@Inject(ORDERS_SERVICE_NAME)
private readonly client: ClientGrpc;

public onModuleInit(): void {
    this.svc = this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);  
}

@Post('sell')
private async sellShare(@Body() body: SellShareRequest): Promise<Observable<SellShareResponse>>{
    return this.svc.sellShare(body);
}

@Post('buy')
@UseGuards(AuthGuardBody)
private async buyshare(@Body() body: BuyShareRequest): Promise<Observable<BuyShareResponse>>{
    return this.svc.buyShare(body);
}

}
