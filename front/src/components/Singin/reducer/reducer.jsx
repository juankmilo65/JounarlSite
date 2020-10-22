const initialState = {
    user: {},
    journalsSelected: [],
    isUpdating:  false
}

const userReducer = (state = initialState, action)=> {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
            case "UPDATE_USER":
            return {
                ...state,
                user: action.payload
            }
            case "UPDATE_JOURNAL":
            return {
                ...state,
                journalsSelected: action.payload.length === 0?[]: action.payload 
            }
            case "IS_UPDATING":
                return {
                    ...state,    
                    isUpdating: action.payload
                }
            default:
                return state;
    }
}

export default userReducer;