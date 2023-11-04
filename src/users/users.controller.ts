import { Body, Controller, Get, Inject, OnModuleInit, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UsersServiceClient,
         SignUpResponse,
         SignUpRequest,
         USERS_SERVICE_NAME, 
         LoginRequest, 
         LoginResponse, 
         WalletServiceClient, 
         GetBalanceRequest, 
         GetBalanceResponse, 
         WALLET_SERVICE_NAME, 
         UpdateBalanceRequest, 
         UpdateBalanceResponse,
         LogoutRequest,
         LogoutResponse} from './users.pb';
import { AuthGuard } from './users.guard';

@Controller('users')
export class UsersController implements OnModuleInit {
  private svc: UsersServiceClient;
  private wvs: WalletServiceClient;

  @Inject(USERS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @Inject(WALLET_SERVICE_NAME)
  private readonly wclient: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
    this.wvs = this.wclient.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }

  @Post('signup')
  private async signup(@Body() body: SignUpRequest): Promise<Observable<SignUpResponse>> {
    return this.svc.signUp(body);
  }

  @Post('login')
  private async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @Get('logout')
  private async logout(@Req() req: LogoutRequest): Promise<Observable<LogoutResponse>>{
    return this.svc.logout(req);
  }

  @Get('getbalance')
  @UseGuards(AuthGuard)
  private async getBalance(@Req() req: GetBalanceRequest): Promise<Observable<GetBalanceResponse>> {
    return this.wvs.getBalance(req);
  }

  @Post('updatebalance')
  @UseGuards(AuthGuard)
  private async updateBalance(@Req() req: UpdateBalanceRequest): Promise<Observable<UpdateBalanceResponse>> {
    return this.wvs.updateBalance(req);
  }
}