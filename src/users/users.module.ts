import { forwardRef, Module } from '@nestjs/common';
import { BlogPostsModule } from 'src/blog-posts/blog-posts.module';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [forwardRef(() => CommentsModule), forwardRef(() => BlogPostsModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
