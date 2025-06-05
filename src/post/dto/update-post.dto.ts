import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];
}
