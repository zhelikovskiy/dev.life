import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'best_dev' })
    @IsString()
    username: string;

    @ApiProperty({
        example:
            'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
    })
    @IsUrl()
    avatar: string;
}
