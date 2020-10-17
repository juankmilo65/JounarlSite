export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_JOURNAL = "UPDATE_JOURNAL";
export const IS_UPDATING = "IS_UPDATING";

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateJournals(journals) {
    return {
        type: UPDATE_JOURNAL,
        payload: journals
    }
}

export function isUpdating(isUpdating) {
    return {
        type: IS_UPDATING,
        payload: isUpdating
    }
}
