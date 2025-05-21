import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({ example: `I think this is a good project.` })
    @IsString()
    @IsNotEmpty()
    content: string;
}
