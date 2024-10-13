import * as Api from "../service/api"
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 360,
      margin: 'auto'
    },
    ul: {
        pl: 0,
        listStyle: 'none'
    }
  }))

const ToDoList = (props:any) => {
    const deleteHandle = async(docId:string) => {
        await Api.deleteTodo(docId);
        props.fetch()
    }

    const updateHandle = async(docId:string) => {
        await Api.toggleComplete(docId);
        props.fetch()
    }
    // propsを元にListを作成する
    const toddoList = props.todos.map((todo: any) => {
        if (todo && todo.docData) {
            return (
                <ListItem
                  key={todo.docId}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete"  onClick={() => deleteHandle(todo.docId)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Checkbox checked={todo.docData.isComplete} color="secondary" onClick={() => updateHandle(todo.docId)} />
                  <ListItemText
                    primary={todo.docData.content}
                    // secondary={true ? '説明文' : null}
                  />
            </ListItem>
            )
        }
    })
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h2>あなたのToDo</h2>
            <ul className={classes.ul}>{toddoList}</ul>
        </div>
    );
}

export default ToDoList;