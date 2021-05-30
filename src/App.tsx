import { FormControl, TextField ,List } from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import React , {useState , useEffect} from 'react';
import styles from './App.module.css';
import {db} from "./firebase";
import TaskItem from "./TaskItem";
import {makeStyles} from "@material-ui/styles"

import {auth} from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  field:{
    marginTop:30,
    marginBottom:20
  },
  list: {
    margin: "auto",
    width: "40%"
  }
})

const App:React.FC = (props:any) => {
  const [tasks , setTasks] = useState([{id:"",title:""}]);
  const [input , setInput] = useState("");
  const classes = useStyles();
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({id:doc.id,title:doc.data().title})))
    })
    return () => unSub();
  } , [])
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("/login")
    })
    return () => unSub()
  } , [])
  const newTask = (e:React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({title:input});
    setInput("");
  }
  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <button className={styles.app__logout} 
      onClick={
        async () => {
          try{
            await auth.signOut();
            props.history.push("/login");
          }catch(error){
            alert(error.message);
          }
        }
      }
      >
        <ExitToAppIcon></ExitToAppIcon>
      </button>
      <br />
      <FormControl>
        <TextField className={classes.field} label="new task" value={input} onChange={(e) => setInput(e.target.value)}></TextField>
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotos></AddToPhotos>
      </button>
      <List className={classes.list}>
      {tasks.map((task) => <TaskItem id={task.id} title={task.title} key={task.id}></TaskItem>)}
      </List>
    </div>
  );
}

export default App;
