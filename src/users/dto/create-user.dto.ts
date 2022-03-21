import { ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    age: number;
    
    @ApiPropertyOptional()
    phoneNumber: string;
}
