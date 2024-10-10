import React, { useContext, useState, useEffect } from "react";
import { dig } from "dig-ts";
import { signInWithGoogle } from "../service/firebase"
import { useAuthContext } from "../providers/AuthProvider";
import * as Api from "../service/api"
import ToDoList from "./ToDoList"

const Dashboard = () => {
    const [inputName, setInputNamet] = useState("");
    const [todos, setTodos] = useState([{}]);
    const useAuth = useAuthContext();

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
          dom = <form>
                    <input placeholder="ToDoName" value={inputName} onChange={(event) => setInputNamet(event.currentTarget.value)} />
                    <button type="button" onClick={() => post()}>追加する</button>
                </form>
        } else {
            // ログインしていない場合
            dom = <button onClick={ signInWithGoogle }>ログイン</button>
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