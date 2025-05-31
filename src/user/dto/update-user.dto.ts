import { IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    username: string;

    @IsUrl()
    avatar: string;
}
