import { IsUUID } from 'class-validator';
import { IsXor } from 'src/utils/is-xor.validator';

export class ToggleLikeDto {
    @IsUUID()
    postId?: string;

    @IsUUID()
    projectId?: string;

    @IsXor('postId', 'projectId')
    _dummy: any;
}
