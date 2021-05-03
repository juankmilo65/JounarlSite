import { IFile } from ".";

export interface IAlertDialog {
    message: string,
    file?: IFile,
    onChange: () => void
}