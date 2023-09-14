export const INITIAL_STATES = {
    list: []
}

export const reducerHandler = (state, action) => {
    switch (action.type) {
        case 'list':
            return {
                list: [...state.list, action.payload]
            }
        case 'DELETE_ITEM':
            return {
                list: action.payload
            }
        case 'TOGGLE_COMPLETE':
            return {
                ...state,
                list: action.payload
            }
        case 'formSetting':
            return {
                ...state,
                formSetting: action.payload
            }
        default:
            return state
    }
}