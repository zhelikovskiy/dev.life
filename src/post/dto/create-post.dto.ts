import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];
}
