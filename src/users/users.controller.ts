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
         forgetPasswordRequest,
         forgetPasswordResponse,
         resetPasswordRequest,
         resetPasswordResponse,
         LogoutRequest,
         LogoutResponse,
         changePasswordRequest,
         changePasswordResponse} from './users.pb';
import { AuthGuard, AuthGuardBody } from './users.guard';

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

  @Post('forgetPassword')
  private async forgetPassword(@Body() body: forgetPasswordRequest): Promise<Observable<forgetPasswordResponse>> {
    return this.svc.forgetPassword(body);
  }

  @Post('resetPassword')
  private async resetPassword(@Body() body: resetPasswordRequest): Promise<Observable<resetPasswordResponse>> {
    return this.svc.resetPassword(body);
  }

  @UseGuards(AuthGuard)
  @Post('changePassword')
  private async changePassword(@Body() body: changePasswordRequest, @Req() req:any): Promise<Observable<changePasswordResponse>> {
    const changePasswordRequest:changePasswordRequest = {
      ...body,
      userId:req.userId
    }
    return this.svc.changePassword(changePasswordRequest)
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  private async logout(@Req() req: any): Promise<Observable<LogoutResponse>>{
    const userId = req.userId;
    return this.svc.logout({token:userId});
  }

  @Get('getbalance')
  @UseGuards(AuthGuard)
  private async getBalance(@Req() req: GetBalanceRequest): Promise<Observable<GetBalanceResponse>> {
    return this.wvs.getBalance(req);
  }

  @Post('updatebalance')
  @UseGuards(AuthGuardBody)
  private async updateBalance(@Body() body: UpdateBalanceRequest): Promise<Observable<UpdateBalanceResponse>> {
    return this.wvs.updateBalance(body);
  }
}