import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
import {useRoutes} from './routes'
import './App.css'

const App = () => {
    const routes = useRoutes()


    return (
        <Router>
            <header>
                <Header/>
            </header>
            <main className="container">
                {routes}
            </main>
        </Router>
    )
}

export default App;
