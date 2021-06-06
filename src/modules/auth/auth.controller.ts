import {
  Body,
  Controller,
  Exception,
  Get,
  Middleware,
  Pipe,
  Post,
  Req
} from '@/core'
import { User } from '@/decorator/user.decorator'
import { authMiddleware } from '@/middleware/auth.middleware'
import { ValidatorPipe } from '@/pipe/validator.pipe'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('/auth')
@Exception()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @Pipe(new ValidatorPipe())
  login(@Body() loginDto: LoginDto) {
    const token = this.authService.login(loginDto)
    return {
      token
    }
  }

  @Get('/getUserInfo')
  @Middleware(authMiddleware)
  getUserInfo(@User() user: any) {
    return user
  }
}
