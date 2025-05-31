import { IsString, IsUrl } from 'class-validator';

export class UpdateProjectDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsUrl()
    link: string;
}
