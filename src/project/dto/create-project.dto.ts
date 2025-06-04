import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsUrl()
    repositoryLink?: string;

    @IsOptional()
    @IsString({ each: true })
    images?: string[];

    @IsString({ each: true })
    tags: string[];

    @IsOptional()
    @IsUrl()
    demoLink?: string;
}
