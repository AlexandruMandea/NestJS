import { Module } from '@nestjs/common';
import { BlogPostsModule } from 'src/blog-posts/blog-posts.module';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [UsersModule, BlogPostsModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
