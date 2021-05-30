import React , {useState} from 'react';
import styles from "./TaskItem.module.css";
import firebase from "firebase/app";
import {ListItem , TextField , Grid} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from  "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import {db} from "./firebase"; 

interface Props{
    id:string;
    title:string;
}

const TaskItem:React.FC<Props> = (props) => {
    const [title , setTitle] = useState(props.title);
    const editTask = () => {
        db.collection("tasks").doc(props.id).set({title:title} , {merge: true});
    }
    const deleteTask = () => {
        db.collection("tasks").doc(props.id).delete();
    }
    return (
            <ListItem>
                <h2>{props.title}</h2>
                <Grid container justify="flex-end">
                    <TextField 
                        label="Edit"
                        value={title}
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTitle(e.target.value)}
                    ></TextField>
                </Grid>
                <button className={styles.taskitem__item} onClick={editTask}>
                    <EditOutlined></EditOutlined>
                </button>
                <button className={styles.taskitem__item} onClick={deleteTask}>
                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                </button>
            </ListItem>
    )
}

export default TaskItem
