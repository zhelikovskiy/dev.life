import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsUrl()
    avatar: string;
}
