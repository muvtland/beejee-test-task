import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import {validateEmail} from '../../utils'
import {createTodo} from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loading: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));





const CreateTodo = () => {
    const classes = useStyles()
    const {process, loading} = useSelector(state => state)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (process.page === 'create') {
            if (process.status){
                setAlert({type: 'success', message: 'Вы успешно добавили новую задачу'})
            }else {
                const message = process.text.token || process.text.text || process.text.status || process.text || 'something wrong.Try again later'
                setAlert({type: 'error', message})
            }
        }
    }, [process])

    const emailChangeHandler = e => {
        setEmail(e.target.value)
    }

    const usernameChangeHandler = e => {
        setUsername(e.target.value)
    }

    const textChangeHandler = e => {
        setText(e.target.value)
    }

    const createHandler = () => {
        if (validateEmail(email)){
           if (username && text){
               dispatch(createTodo({username, email, text}))
           } else {
               setAlert({type: 'error', message : !username && !text ? 'Поля username и text обязательны' : `Поле ${!username ? 'username' : 'text'} обязательное`})
           }
        }else {
            setAlert({type: 'error', message: 'Некоректная электронная почта'})
        }
    }

    if (loading){
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return(
        <Container component="main" maxWidth="xs">
            {alert && <Alert severity={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert>}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FormatListNumberedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create task
                </Typography>
                <div className={classes.form} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="username"
                        autoFocus
                        error={!username}
                        value={username}
                        onChange={usernameChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="email"
                        autoFocus
                        error={!email || !validateEmail(email)}
                        value={email}
                        onChange={emailChangeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="text"
                        error={!text}
                        type="text"
                        value={text}
                        onChange={textChangeHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={createHandler}
                    >
                        create
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default CreateTodo