import { IUser } from "./IUser";

export interface IUserContexState {
    user: IUser,
    filesSelected: string[],
    isUpdating: boolean
}