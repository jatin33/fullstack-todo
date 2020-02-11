import React from 'react';
import styles from './TodoTracker.module.css';
import Task from './Task/Task';
import db from '../db';

class TodoTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.currentText = React.createRef();
    }

    componentDidMount(){
        db.table('tasks')
          .toArray()
          .then((todos)=>{
              this.setState({todos});
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { value } = this.currentText.current;
        let { todos } = this.state;
        if(value !== ''){
            const task = {
                text: value
            }
            db.table('tasks')
              .add(task)
              .then((id)=>{
                task[id]=id;
                todos.push(task);
                this.currentText.current.value = '';
                this.setState({todos});
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
                    <label htmlFor="taskname">
                    Task Name:
                    <input value={this.state.currentText}
                           ref={this.currentText}
                           placeholder={'Enter Task'} 
                           id="taskname"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <div data-testid="tasklist">
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