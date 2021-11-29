import React, { useState } from 'react';
import { useTodoLayerValue } from '../context/TodoContext';
import Todo from './Todo';

const List = ({ todos }) => {
  const [{}, dispatch] = useTodoLayerValue();

  const removeCompleted = (todos) => {
    dispatch({
      type: 'REMOVE_COMPLETED_TODO',
      payload: todos,
    });
  };

  const [filteredId, setFilteredId] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const all = () => todos.filter((todo) => todo);
  const active = () => todos.filter((todo) => !todo.isCompleted);
  const completed = () => todos.filter((todo) => todo.isCompleted);
  const filter = filteredId.all
    ? all()
    : filteredId.active
    ? active()
    : completed();

  return (
    <section className='main'>
      <input className='toggle-all' type='checkbox' />
      <label htmlFor='toggle-all'>Mark all as complete</label>

      {todos.length > 0 && (
        <>
          <ul className='todo-list'>
            {filter.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>

          <footer className='footer'>
            <span className='todo-count'>
              <strong>{filter.length}</strong>
              items left
            </span>

            <ul className='filters'>
              <li>
                <a
                  onClick={() =>
                    setFilteredId({
                      all: true,
                      active: false,
                      completed: false,
                    })
                  }
                  className={filteredId.all ? 'selected' : ''}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    setFilteredId({
                      all: false,
                      active: true,
                      completed: false,
                    })
                  }
                  className={filteredId.active ? 'selected' : ''}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  onClick={() =>
                    setFilteredId({
                      all: false,
                      active: false,
                      completed: true,
                    })
                  }
                  className={filteredId.completed ? 'selected' : ''}
                >
                  Completed
                </a>
              </li>
            </ul>
            {todos.filter((todo) => todo.isCompleted).length > 0 ? (
              <button
                className='clear-completed'
                onClick={() => removeCompleted(todos)}
              >
                Clear completed
              </button>
            ) : null}
          </footer>
        </>
      )}
    </section>
  );
};

export default List;
