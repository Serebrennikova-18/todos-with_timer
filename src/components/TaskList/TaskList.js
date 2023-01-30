import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default function TaskList({
    todos,
    onDeleted,
    onStart,
    onStop,
    onToggleCompleted,
    onChangeName,
}) {
    TaskList.propTypes = {
        onToggleCompleted: PropTypes.func.isRequired,
        onDeleted: PropTypes.func.isRequired,
        onChangeName: PropTypes.func.isRequired,
    };
    const elements = todos.map((item) => {
        const { id } = item;

        return (
            <Task
                {...item}
                key={id}
                onDeleted={() => onDeleted(id)}
                onToggleCompleted={() => onToggleCompleted(id)}
                onChangeName={(ids, text) => onChangeName(ids, text)}
                onStart={() => onStart(id)}
                onStop={() => onStop(id)}
            />
        );
    });

    return <ul className='todo-list'>{elements}</ul>;
}
