import React, { useContext, useState, useEffect } from "react";
import { dig } from "dig-ts";
import { signInWithGoogle } from "../service/firebase"
import { useAuthContext } from "../providers/AuthProvider";
import * as Api from "../service/api"
import ToDoList from "./ToDoList"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
      textAlign: 'center',
      mt: 40,
      justifyContent: 'space-between'
    },
    form: {
      width: "100%",
      maxWidth: 360,
      margin: "auto",
      marginBottom: 40,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
    },
    input: {
        marginRight: 10
      }
  }))

const Dashboard = () => {
    const [inputName, setInputNamet] = useState("");
    const [todos, setTodos] = useState([{}]);
    const useAuth = useAuthContext();
    const classes = useStyles();

    useEffect(() => {
        fetch();
    }, [useAuth])

    const fetch = async() => {
        if (useAuth) {
            const data = await Api.initGet(useAuth.uid);
            setTodos(data)
        }
    }
    const formRender = () => {
        let dom;
        if (useAuth) {
          dom = <form className={classes.form}>
                    {/* <TextField placeholder="ToDoName" label="Todo" value={inputName} onChange={(event) => setInputNamet(event.currentTarget.value)} /> */}
                    <Input className={classes.input} placeholder="ToDoName" value={inputName} onChange={(event) => setInputNamet(event.currentTarget.value)} />
                    <Button type="button" color="primary" onClick={() => post()}
                        disabled={inputName.length<=0}>
                            追加する
                    </Button>
                </form>
        } else {
            // ログインしていない場合
            dom = <Button onClick={ signInWithGoogle }>ログイン</Button>
        }
        return dom
      }

    const post = async() => {
        if (useAuth) {
            await Api.addTodo(inputName, useAuth.uid);
            await setInputNamet("");
            fetch();
        }
    }

    return(
        <div>
            { formRender() }
            <ToDoList todos={todos} fetch={fetch} />
        </div>
    );
}
export default Dashboard;