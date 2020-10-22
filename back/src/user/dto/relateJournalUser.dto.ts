import { ApiProperty } from '@nestjs/swagger';

export class RelateJournalUserDTO {
    
    @ApiProperty()
    readonly idUser: String;

    @ApiProperty()
    readonly idJournal: String;

    @ApiProperty()
    readonly isSelected: Boolean;

}