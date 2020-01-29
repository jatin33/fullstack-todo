import React from 'react';
import styles from './Task.module.css';
import PropTypes from 'prop-types';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false
        }
        this.editBox = React.createRef();
    }

    showForm = (visibility) => {
        this.setState({ isFormVisible: visibility });
    }

    render() {
        return (
            <div className={styles.container}>
                <p>#{this.props.text}</p>
                <button onClick={() => { this.showForm(true) }}>Edit</button>
                <button onClick={() => { this.props.delete(this.props.index) }}>Delete</button>
                <form className={this.state.isFormVisible ? styles.show : styles.hide}
                    onSubmit={(event) => {
                        event.preventDefault();
                        this.showForm(false);
                        this.props.edit(this.props.index, this.editBox.current.value)
                    }}>
                    <input ref={this.editBox} />
                    <input type="submit" value="Change Text" />
                </form>
            </div>
        )
    }
}

Task.propTypes = {
  text: PropTypes.string,
  index: PropTypes.number,
  delete: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
};

export default Task;