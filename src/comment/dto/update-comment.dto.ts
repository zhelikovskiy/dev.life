import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
    @ApiProperty({ example: 'I think this is a best project.' })
    @IsString()
    @IsNotEmpty()
    content: string;
}
