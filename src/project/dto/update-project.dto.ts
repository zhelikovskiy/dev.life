/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsUrl } from 'class-validator';

export class UpdateProjectDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsUrl()
    link: string;
}
