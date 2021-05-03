import { IMouseEvent } from "..";

export interface ITableCell {
    page: string,
    isItemSelected: boolean,
    labelId: string,
    rowId: string,
    fileName: string,
    onClick: (event: IMouseEvent, idFile: string) => Promise<void>
}