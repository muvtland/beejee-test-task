import {BASEURL, DEVELOPERNAME} from '../constants'
import {
    GETTODOS,
    ADDTODOCOUNT,
    LOGOUT,
    LOGIN,
    LOADINGSTART,
    LOADINGEND,
    PROCESS
} from './types'


const loadingStart = () => ({type: LOADINGSTART})
const loadingEnd = () => ({type: LOADINGEND})
const loginAction = () => ({type: LOGIN})

export const logout = () => {
    localStorage.removeItem('token')
    return dispatch => {
        dispatch({type: LOGOUT})
        dispatch(addProcess({status: false, text: ''}))
    }
}


const addTodos = todos => {
    return dispatch => {
        dispatch({type: GETTODOS, payload: todos})
    }
}

const addTodosCount = todosCount => {
    return dispatch => {
        dispatch({type: ADDTODOCOUNT, payload: todosCount})
    }
}


const addProcess = process => {
    return dispatch => {
        dispatch({type: PROCESS, payload: process})
    }
}



export const getTodos = ({sort_field, sort_direction, page}) => {
    return async dispatch => {
        try{
            dispatch(loadingStart())
            const response = await fetch(`${BASEURL}/?developer=${DEVELOPERNAME}&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`)
            const data = await response.json()
            if (data.status === 'ok'){
                dispatch(addTodos(data.message.tasks))
                dispatch(addTodosCount(data.message.total_task_count))
            }else {
                dispatch(addProcess({status: false, text: data.message, page: 'create'}))
            }
            dispatch(loadingEnd())
        }catch (e) {
            dispatch(addTodos([]))
            dispatch(addProcess({status: false, text: e.message || 'something wrong.Try again later', page: 'create'}))
            dispatch(loadingEnd())
        }
    }
}

export const createTodo = ({username, email, text}) => {
    return async dispatch => {
        try{
            dispatch(loadingStart())
            const form = new FormData()
            form.append('username', username)
            form.append('email', email)
            form.append('text', text)
            const response = await fetch(`${BASEURL}/create?developer=${DEVELOPERNAME}`, {
                crossDomain: true,
                method: 'POST',
                mimeType: 'multipart/form-data',
                contentType: false,
                processData: false,
                body: form
            })
            const data = await response.json()
            if (data.status === 'ok'){
                dispatch(addProcess({status: true, text: 'Вы успешно добавили новую задачу', page: 'create'}))
            }else {
                dispatch(addProcess({status: false, text: data.message, page: 'create'}))
            }
            dispatch(loadingEnd())
        }catch (e) {
            dispatch(addProcess({status: false, text: e.message || 'something wrong.Try again later', page: 'create'}))
            dispatch(loadingEnd())
        }
    }
}

export const editTodo = ({token, id, text, status}) => {
    return async dispatch => {
        try{
            dispatch(loadingStart())
            const form = new FormData()
            form.append('token', token)
            text && form.append('text', text)
            status && form.append('status', status)

            console.log(form)
            console.log(token)
            console.log(text)
            console.log(status)
            const response = await fetch(`${BASEURL}/edit/${id}?developer=${DEVELOPERNAME}`,
                {
                    crossDomain: true,
                    method: 'POST',
                    mimeType: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    body: form
                })
            const data = await response.json()
            console.log(data)
            if (data.status === 'ok'){
                const response = await fetch(`${BASEURL}/?developer=${DEVELOPERNAME}`)
                let data = await response.json()
                dispatch(addTodos(data.message.tasks))
                dispatch(addProcess({status: true, text: 'Вы успешно изменили задачу', page: 'main'}))
            }else {
                dispatch(addProcess({status: false, text: data.message, page: 'main'}))
            }
            dispatch(loadingEnd())
        }catch (e) {
            dispatch(addProcess({status: false, text: e.message || 'something wrong.Try again later', page: 'main'}))
            dispatch(loadingEnd())
        }
    }
}

export const login = ({username , password}) => {
    return async dispatch =>  {
        try{
            dispatch(loadingStart())
            const form = new FormData()
            form.append('username', username)
            form.append('password', password)

            const response = await fetch(`${BASEURL}/login?developer=${DEVELOPERNAME}`, {
                crossDomain: true,
                method: 'POST',
                mimeType: 'multipart/form-data',
                contentType: false,
                processData: false,
                body: form
            })
            const data = await response.json()
            if (data.status === 'ok'){
                console.log(data)
                localStorage.setItem('token', data.message.token)
                dispatch(loginAction())
                dispatch(addProcess({status: true, text: 'Вы успешно залогинились преветствуем дорогой ' + username, page: 'login'}))
            }else {
                dispatch(addProcess({status: false, text: data.message.password, page: 'login'}))
            }
            dispatch(loadingEnd())
        }catch (e) {
            dispatch(addProcess({status: false, text: e.message || 'something wrong.Try again later', page: 'login'}))
            dispatch(loadingEnd())
        }
    }
}