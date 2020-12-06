import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import TodoItem from '../../components/ToDoItem'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import Alert from '@material-ui/lab/Alert'
import {getTodos} from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%'
    },
    paginationWrapper: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
    footerWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    sortWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 40
    },
    sortTitle: {
        marginRight: 100
    },
    loading: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


const Main = () => {
    const history = useHistory()
    const classes = useStyles()
    const dispatch = useDispatch()
    const {todos, todosCount, process, loading} = useSelector(state => state)
    const [filed, setFiled] = useState('')
    const [direction, setDirection] = useState('')
    const [page, setPage] = useState(1)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        dispatch(getTodos({}))
    }, [dispatch])

    useEffect(() => {
        if (process.page === 'main' && !process.status) {
            const message = process.text.token || process.text.text || process.text.status || process.text || 'something wrong.Try again later'
            setAlert({type: 'error', message})
        }
        if (process.page === 'main' && process.status) {
            setAlert({type: 'success', message: 'Изменения сохранены'})
        }
    }, [process])

    const handleChangeFiled = (event) => {
        setFiled(event.target.value)
        dispatch(getTodos({sort_field: filed}))
    }
    const handleChangeDirection = (event) => {
        setDirection(event.target.value)
        dispatch(getTodos({sort_direction: direction}))
    }
    const handleChangePage = (event, value) => {
        console.log(value, 'value')
        setPage(pre => value)
        dispatch(getTodos({page: value}))
    };

    const routeHandler = () => {
        history.push('/create')
    }

    if (loading){
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    const test = '<img src="1" onerror="alert(\'Gotcha!\')" />'

    return (
        <div className={classes.main}>
            {alert && <Alert severity={alert.type} onClose={() => setAlert(null)} >{alert.message}</Alert>}
            <div className={classes.sortWrapper}>
                <h2 className={classes.sortTitle}>Отсортировать по</h2>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">полю</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filed}
                        onChange={handleChangeFiled}
                    >
                        <MenuItem value={'id'}>id</MenuItem>
                        <MenuItem value={'username'}>username</MenuItem>
                        <MenuItem value={'email'}>email</MenuItem>
                        <MenuItem value={'status'}>status</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">направлению</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={direction}
                        onChange={handleChangeDirection}
                    >
                        <MenuItem value={'asc'}>по возрастанию</MenuItem>
                        <MenuItem value={'desc'}>по убыванию</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {todos.map(todo => <TodoItem {...todo} key={todo.id}/>)}
            <div className={classes.footerWrapper}>
                <Button variant="contained" color="primary" onClick={routeHandler}>
                    Create task
                </Button>
                {
                    todosCount > 3 ? <div className={classes.paginationWrapper}>
                        <Pagination count={Math.ceil(todosCount / 3)} color="primary" onChange={handleChangePage} defaultPage={page}/>
                    </div> : null
                }
            </div>
        </div>
    )
}

export default Main