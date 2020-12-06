import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'
import {logout} from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    admin: {
        marginRight: 15
    }
}));

const Header = () => {
    const history = useHistory()
    const classes = useStyles()

    const admin = useSelector(state => (state.admin))
    const dispatch = useDispatch()

    console.log('header update on admin change')
    const routeHandler = path => {
        console.log(path)
        history.push(path)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <AssignmentIcon onClick={() => routeHandler('/')}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Button color="inherit" onClick={() => routeHandler('/')}>Main</Button>
                </Typography>
                {
                    admin ?
                    <>
                        <h4 className={classes.admin}>Hello Admin</h4>
                        <Button color="inherit" onClick={logoutHandler}>Logout</Button>
                    </>
                    :
                    <Button color="inherit" onClick={() => routeHandler('/login')}>Login</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header