import React from 'react';
import styles from './TodoTracker.module.css';
import Task from './Task/Task';
import db from '../db';

class TodoTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            currentText: ''
        }
    }

    componentDidMount(){
        db.table('tasks')
          .toArray()
          .then((todos)=>{
              this.setState({todos});
          });
    }

    handleChange = (e) => {
        this.setState({ currentText: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { currentText } = this.state;
        let { todos } = this.state;
        if(this.state.currentText !== ''){
            const task = {
                text: currentText
            }
            db.table('tasks')
              .add(task)
              .then((id)=>{
                task[id]=id;
                todos.push(task);
                currentText = '';
                this.setState({todos,currentText});
              })
              .catch((err)=>{
                  console.log(`Cannot add task cause ${err}`);
              })
        }
    }

    deleteTask = (index) => {
        const { todos } = this.state;
        db.table('tasks')
          .delete(index)
          .then(()=>{
              this.setState({ todos: todos.filter((todo)=> todo.id !== index) });
          })
          .catch((err)=>{
              console.log(`Delete failed cause : ${err}`);
          })
    }

    editTask = (index, text) => {
        const { todos } = this.state;
        db.table('tasks')
          .update(index,{text})
          .then(()=>{
            todos.forEach((todo)=>{
                if(todo.id === index){
                    todo.text = text;
                }
            });
            this.setState({todos});
          })
          .catch((err)=>{
              console.log(`Cannot edit task cause :${err}`);
          })
    }

    render() {
        return (
            <div className={styles.container}>
                <form onSubmit={this.handleSubmit} className={styles.form}>
                    <input value={this.state.currentText} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    {this.state.todos.map((task, index) => <Task text={task.text}
                        key={index}
                        index={task.id}
                        delete={this.deleteTask}
                        edit={this.editTask} />)}
                </div>
            </div>
        )
    }
}

export default TodoTracker;