import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    repositoryLink?: string;

    @IsOptional()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsUrl()
    demoLink?: string;
}
