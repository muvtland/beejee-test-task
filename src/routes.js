import {Switch, Route} from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import CreateTodo from './pages/CreateTodo'

export const useRoutes = () => {

    return (
        <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/login' exact component={Login}/>
            <Route path='/create' exact component={CreateTodo}/>
        </Switch>
    )
}