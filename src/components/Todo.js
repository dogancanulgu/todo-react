import React from 'react';
import { useTodoLayerValue } from '../context/TodoContext';

const Todo = ({ todo }) => {
  const [{}, dispatch] = useTodoLayerValue();

  const removeTodo = (todoId) => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: todoId,
    });
  };

  const completeTodo = (todoId) => {
    dispatch({
      type: 'COMPLETE_TODO',
      payload: todoId,
    });
  };

  return (
    <>
      <li className={todo.isCompleted ? 'completed' : ''}>
        <div
          className='view'
          onClick={() => {
            completeTodo(todo.id);
          }}
        >
          <input
            className='toggle'
            type='checkbox'
            defaultChecked={todo.isCompleted}
          />
          <label>{todo.content}</label>
          <button
            className='destroy'
            onClick={() => removeTodo(todo.id)}
          ></button>
        </div>
      </li>
    </>
  );
};

export default Todo;
