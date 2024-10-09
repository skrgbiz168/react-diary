import firebase from 'firebase/app';
import { Timestamp, collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import * as FB from './firebase';

export const initGet: any = async(uid:string) => {
    const todo = await getDocs(
        query(collection(FB.db, "todo"),
        orderBy("createdAt", 'desc'),
        where("uid", "==", uid)
        )
    );

    let result:any = [];

    // return todo.docs.forEach((doc) => {
    //     result.push({
    //         id: doc.id,
    //         content: doc.data().content,
    //         isCompleted: doc.data().isCompleted,
    //     })
    // })

    // 1つ1つ取る場合
    // return todo.docs.map((doc) => ({
    //     id: doc.id,
    //     content: doc.data().content,
    //     isCompleted: doc.data().isCompleted,
    // }));

    // まとめて取る場合
    return todo.docs.map((doc) => ({
        docId: doc.id,
        docData: doc.data()
    }))
}

export const addTodo = (content:string, uid:string) => {
    addDoc(collection(FB.db, "todo"), {
        content: content,
        uid: uid,
        isComplete: false,
        createdAt: Timestamp.now()
    });


    // db.collection("todo").add({
    //     content: content,
    //     uid: uid,
    //     isComplete: false,
    //     createdAt: Timestamp.now()
    // })
}

export const deleteTodo = (uid:string) => {
    deleteDoc(doc(FB.db, "todo", uid))
        .then(() => {
            console.log("削除完了")
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
}
