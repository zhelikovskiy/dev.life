/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UpdateProjectDto {
    @ApiProperty({ example: 'TODO list' })
    @IsString()
    title: string;

    @ApiProperty({ example: `It's my first project on node.js!!` })
    @IsString()
    description: string;

    @ApiProperty({
        example: `https://github.com/zhelikovskiy/TODO-List-Backend`,
    })
    @IsUrl()
    link: string;
}
