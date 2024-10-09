import React, { useContext, useState, useEffect } from "react";
import { dig } from "dig-ts";
import { signInWithGoogle } from "../service/firebase"
import { user, useAuthContext } from "../providers/AuthProvider";
import * as Api from "../service/api"

const ToDoList = (props:any) => {
    const deleteHandle = async(id:string) => {
        await Api.deleteTodo(id);
        props.fetch()
    }
    // propsを元にListを作成する
    const toddoList = props.todos.map((todo: any) => {
        if (todo && todo.docData) {
            return (
                <li key={todo.docId}>
                    {todo.docData.content}
                    <button type="button" onClick={() => deleteHandle(todo.docId)}>削除</button>
                </li>
            )
        }
    })
    return (
        <div>
            <h2>あなたのToDo</h2>
            <ul>{toddoList}</ul>
        </div>
    );
}

export default ToDoList;