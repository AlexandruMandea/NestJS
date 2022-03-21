import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly usersService: CommentsService) {}

    @Get('/user/:userID')
    getCommentsOfAUserPaginated(
        @Param('userID') userID: number,
        @Query('page number') page: number,
        @Query('limit') limit: number
        ) {
        return this.usersService.getCommentsOfAUserPaginated(userID, page, limit);
    }
}
