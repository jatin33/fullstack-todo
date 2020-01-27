import React from 'react';
import styles from './TodoTracker.module.css';
import Task from './Task/Task';

class TodoTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            currentText: ''
        }
    }

    handleChange = (e) => {
        this.setState({ currentText: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { currentText } = this.state;
        let { todos } = this.state;
        if (this.state.currentText !== '') {
            todos.push(currentText);
            currentText = '';
            this.setState({ todos, currentText });
        }
    }

    deleteTask = (index) => {
        const { todos } = this.state;
        todos.splice(index, 1);
        this.setState({ todos });
    }

    editTask = (index, text) => {
        const { todos } = this.state;
        todos[index] = text;
        this.setState({ todos });
    }

    render() {
        return (
            <div className={styles.container}>
                <form onSubmit={this.handleSubmit} className={styles.form}>
                    <input value={this.state.currentText} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    {this.state.todos.map((task, index) => <Task text={task}
                        key={index}
                        index={index}
                        delete={this.deleteTask}
                        edit={this.editTask} />)}
                </div>
            </div>
        )
    }
}

export default TodoTracker;