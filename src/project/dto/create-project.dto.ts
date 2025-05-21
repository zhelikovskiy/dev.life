/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ example: 'TODO list' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: `It's my first project on node.js!!` })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: `https://github.com/zhelikovskiy/TODO-List-Backend`,
    })
    @IsUrl()
    link: string;
}
