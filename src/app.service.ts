import { Injectable } from '@nestjs/common';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  // constructor(private readonly usersService: UsersService,
  //    private readonly blogPostsService: BlogPostsService) {}
  
  getHello(): string {
    return 'Hello World!';
  }
}
