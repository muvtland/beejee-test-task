import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Alert from "@material-ui/lab/Alert"
import {login} from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wrapper: {
        paddingTop: theme.spacing(4),
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
        marginBottom: theme.spacing(6),
    },
    loading: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const classes = useStyles()

    const dispatch = useDispatch()
    const {process, loading} = useSelector(state => state)

    useEffect(() => {
        if (process.page === 'login'){
            if (process.status){
                history.push('/')
            }else {
                setError(process.text)
            }
        }
    }, [process, history])

    const loginHandler = () => {
        if (username && password){
            dispatch(login({username, password}))
        }else {
            setError( !login && !password ? 'Поля логин и пароль обязательны' : `Поле ${!username ? 'Логин' : 'Пароль'} обязательное`)
        }
    }

    const usernameChange = e => {
        setUsername(e.target.value)
    }

    const passwordChange = e => {
        setPassword(e.target.value)
    }

    if (loading){
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.wrapper}>
            {
                error && <Alert severity="error" className={classes.error} onClose={() => setError('')}>{error}</Alert>
            }
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        autoFocus
                        value={username}
                        onChange={usernameChange}
                        error={!username}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={passwordChange}
                        error={!password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={loginHandler}
                    >
                        login
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Login