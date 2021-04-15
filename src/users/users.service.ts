import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account-dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    // check new user
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return [false, 'There is a user with that email already'];
      }
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (error) {
      return [false, "Couldn't create account"];
    }
    // create user & hash the password
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // find the user with the email
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
    // check if the password is correct
      const passwordCorrect = await user.checkPassword(password);
      if(!passwordCorrect){
        return {
          ok: false,
          error: "Wrong password"
        }
      }
      return {
        ok: true,
        token: "lalalaalllla"
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }

    // make JWT and give it to the user
  }
}
