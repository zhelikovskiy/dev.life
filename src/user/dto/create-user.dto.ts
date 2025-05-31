import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'best_dev' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ example: 's23!sk$#cc' })
    @IsString()
    password: string;

    @ApiProperty({
        example:
            'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    })
    @IsUrl()
    avatar: string;
}
