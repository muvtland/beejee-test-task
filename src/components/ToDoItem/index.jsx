import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {green} from '@material-ui/core/colors'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Checkbox from '@material-ui/core/Checkbox'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {TextField} from '@material-ui/core'
import {editTodo} from '../../redux/actions'

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        marginBottom: 30
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    info: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10
    },
    input: {
        marginLeft: 15,
    }
});

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const ToDoItem = ({id, username, email, text, status}) => {
    const dispatch = useDispatch()
    const {admin} = useSelector(state => state)
    const [edit, setEdit] = useState(false)
    const [localText, setLocalText] = useState(text)
    const [localStatus, setLocalStatus] = useState(status)
    const classes = useStyles()


    const editHandle = () => {
        if (edit){
            const token = localStorage.getItem('token')
            dispatch(editTodo({token, id, text: localText, status: localStatus}))
        }
        setEdit(!edit)
    }

    const statusChangeHandler = () => {
        setLocalStatus(prev => {
            return prev > 0 ? 0 : 10
        })
    }

    const textChangeHandler = e => {
        setLocalText(e.target.value)
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Task
                </Typography>
                <Typography className={classes.info}>
                    <AccountBoxIcon/> {username}
                </Typography>
                <Typography className={classes.info}>
                    <AlternateEmailIcon/> {email}
                </Typography>
                <Typography className={classes.info} color="textSecondary">
                    <FormatListNumberedIcon/> {edit ? <TextField value={localText} className={classes.input} onChange={textChangeHandler}/> : localText}
                </Typography>
                <Typography variant="body2" component="p">
                    <FormControlLabel
                        control={<GreenCheckbox disabled={!edit} checked={localStatus > 0} onChange={statusChangeHandler}
                                                name="checkedG"/>}
                        label="task completed"
                    />
                </Typography>
            </CardContent>
            {
                admin &&
                <CardActions>
                    <Button size="small" onClick={editHandle} color={edit ? 'primary' : 'success'}>{edit ? 'Save' : 'Edit'}</Button>
                </CardActions>
            }
        </Card>
    );
}

export default ToDoItem