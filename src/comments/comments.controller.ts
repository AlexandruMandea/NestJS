import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly usersService: CommentsService) {}

    @Get('/user/:postID')
    getCommentsOfABlogPost(
        @Param('postID') postID: number,
        @Query('page number') page: number,
        @Query('limit') limit: number
        ) {
        return this.usersService.getCommentsOfABlogPostPaginated(postID, page, limit);
    }
}
