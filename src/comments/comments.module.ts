import { forwardRef, Module } from '@nestjs/common';
import { BlogPostsModule } from 'src/blog-posts/blog-posts.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
