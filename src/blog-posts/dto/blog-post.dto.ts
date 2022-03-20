import { ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { User } from "src/users/models/User";

export class CreateBlogPostDTO {
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    content: string;

    @ApiPropertyOptional()
    userID: number;
}
