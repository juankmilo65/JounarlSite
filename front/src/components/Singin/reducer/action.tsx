import { IUser } from "../../../interfaces";


export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_JOURNAL = "UPDATE_JOURNAL";
export const IS_UPDATING = "IS_UPDATING";

export function setUser(user: IUser) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function updateUser(user: IUser) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateJournals(journals: string[]) {
    return {
        type: UPDATE_JOURNAL,
        payload: journals
    }
}

export function isUpdating(isUpdating: boolean) {
    return {
        type: IS_UPDATING,
        payload: isUpdating
    }
}
