import { Body, Controller, Exception, Pipe, Post } from '@/core'
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
}
