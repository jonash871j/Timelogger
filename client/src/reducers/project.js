import { API_TYPES } from "../api/project";
const initialState = {
    list: []
}

export const project = (state = initialState, action) => {

    switch (action.type) {
        case API_TYPES.GET_ALL:
            return {
                ...state,
                list: [...action.payload]
            }
        case API_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case API_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case API_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id !== action.payload)
            }
        case API_TYPES.GET_ALL_SORTED_BY_DEADLINE:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}