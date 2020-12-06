import {
    GETTODOS,
    ADDTODOCOUNT,
    LOGIN,
    LOGOUT,
    LOADINGSTART,
    LOADINGEND,
    PROCESS
} from './types'

const handlers = {
    [GETTODOS]: (state, action) => {
        return {...state, todos: [...action.payload]}
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
    [PROCESS]: (state, action) => {
        return {...state, process: action.payload}
    },
    DEFAULT: state => state
}


const initialState = {
    todos: [],
    todosCount: 0,
    admin: localStorage.getItem('token'),
    loading: false,
    process: {
        status: false,
        text: undefined,
        page: undefined
    }
}


export const todoReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}