import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDTO } from './dto/blog-post.dto';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
    constructor(private readonly blogPostsService: BlogPostsService) {}

    @Post()
    createPost(@Body() body: CreateBlogPostDTO) {
        return this.blogPostsService.createBlogPost(body);
    }

    @Get('/user/:userID')
    getBlogPostsOfAUser(
        @Param('userID') userID: number,
        @Query('page number') page: number,
        @Query('limit') limit: number
        ) {
        return this.blogPostsService.getBlogPostsOfAUserPaginated(userID, { page, limit });
    }
}
