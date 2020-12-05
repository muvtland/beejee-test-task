import {
    GETTODOS,
    ADDTODOCOUNT,
    LOGIN,
    LOGOUT,
    LOADINGSTART,
    LOADINGEND,
    ADDERRORMESSAGE,
    PROCESS
} from './types'

const handlers = {
    [GETTODOS]: (state, action) => {
        return {...state, todos: [...action.payload.todos]}
    },
    [ADDTODOCOUNT]: (state, action) => {
        return {...state, todosCount: action.payload}
    },
    [LOGIN]: state => {
        return {...state, admin: true}
    },
    [LOGOUT]: state => {
        return {...state, admin: false}
    },
    [LOADINGSTART]: state => {
        return {...state, loading: true}
    },
    [LOADINGEND]: state => {
        return {...state, loading: false}
    },
    [ADDERRORMESSAGE]: (state, action) => {
        return {...state, errorMessage: action.payload}
    },
    [PROCESS]: (state, action) => {
        return {...state, process: action.payload}
    },
    DEFAULT: state => state
}


const initialState = {
    todos: [],
    todosCount: 0,
    admin: false,
    loading: false,
    process: {
        status: false,
        text: undefined
    },
    errorMessage: undefined
}


export const todoReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}