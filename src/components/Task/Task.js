/* eslint-disable class-methods-use-this */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

export default class Task extends Component {
    constructor(props) {
        super(props);
        const { label } = this.props;
        this.state = {
            labelState: label,
            edit: false,
        };
    }

    formatting = (seconds) => {
        return [Math.floor((seconds / 60) % 60), Math.floor(seconds % 60)]
            .join(':')
            .replace(/\b(\d)\b/g, '0$1');
    };

    onLabelChange = (e) => {
        this.setState({
            labelState: e.target.value,
        });
    };

    onSubmit = (e) => {
        const { labelState } = this.state;
        const { onChangeName } = this.props;
        e.preventDefault();
        onChangeName(e.target.id, labelState);
        this.setState({
            edit: false,
        });
    };

    handlerClick = () => {
        const newEdit = true;
        this.setState({
            edit: newEdit,
        });
    };

    render() {
        const {
            label,
            timer,
            deadline,
            date,
            onDeleted,
            id,
            onStart,
            onStop,
            onToggleCompleted,
            completed,
        } = this.props;
        const btn =
            timer === null || timer === undefined ? (
                <button
                    className='icon icon-play'
                    type='button'
                    onClick={onStart}
                />
            ) : (
                <button
                    className='icon icon-pause'
                    type='button'
                    onClick={onStop}
                />
            );
        const result = formatDistanceToNow(date, { includeSeconds: true });
        const { labelState } = this.state;
        const { edit } = this.state;
        const classNames = completed ? 'description completed' : 'description';
        const content = edit ? (
            <form className='' onSubmit={this.onSubmit} id={id}>
                <input
                    type='text'
                    className='edit'
                    placeholder='Editing task'
                    onChange={this.onLabelChange}
                    value={labelState}
                />
            </form>
        ) : (
            <div className='view'>
                <input
                    id={id.toString()}
                    className='toggle'
                    type='checkbox'
                    onChange={onToggleCompleted}
                    checked={completed}
                />
                <label htmlFor={id}>
                    <span className={classNames}>{label}</span>
                    <span className='time'>
                        {btn}
                        {this.formatting(deadline)}
                    </span>
                    <span className='created'>created {result}</span>
                </label>
                <button
                    type='button'
                    className='icon icon-edit float-right'
                    onClick={this.handlerClick}
                />
                <button
                    type='button'
                    className='icon icon-destroy float-right'
                    onClick={onDeleted}
                />
            </div>
        );

        return <li className={edit ? 'editing' : ''}>{content}</li>;
    }
}

Task.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
};
