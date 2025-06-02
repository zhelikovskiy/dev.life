import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsXor } from 'src/utils/is-xor.validator';

export class CreateCommentDto {
    @IsUUID()
    postId?: string;

    @IsUUID()
    projectId?: string;

    @IsString()
    @IsOptional()
    parentId?: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsXor('postId', 'projectId')
    dummy: any;
}
