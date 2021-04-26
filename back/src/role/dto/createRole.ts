import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDTO {
    @ApiProperty()
    _id: String;
    @ApiProperty()
    name: String
}