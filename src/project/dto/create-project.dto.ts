import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsUrl()
    repositoryLink: string;
}
