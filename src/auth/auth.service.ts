import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hash,
        },
      });

      return this.sighToken(user.id, user.email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException('Email already in use');
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ForbiddenException('Invalid credentials');

    return this.sighToken(user.id, user.email);
  }

  async sighToken(userId: string, email: string) {
    const payload = { userId, email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
