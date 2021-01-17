import { Injectable } from '@/core'
import { LoginDto } from './dto/login.dto'
import { signToken } from '@/utils/auth'
import { BadRequest } from '@/exception'

@Injectable()
export class AuthService {
  login({ username, password }: LoginDto) {
    if (username === 'admin' && password === '123456') {
      const user = {
        id: '1'
      }
      return signToken(user)
    }
    throw new BadRequest({
      message: 'username or password is wrong'
    })
  }
}
