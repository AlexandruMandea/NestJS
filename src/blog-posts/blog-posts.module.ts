import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
  exports: [BlogPostsService]
})
export class BlogPostsModule {}
