import React, { useState } from 'react';
import './App.css';
import { useTodoLayerValue } from './context/TodoContext';
import List from './components/List';

const App = () => {
  const [{ todos }, dispatch] = useTodoLayerValue();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content && content.length < 1) return;

    const newTodo = {
      id: Math.floor(Math.random() * 561651351),
      content,
      isCompleted: false,
    };

    dispatch({
      type: 'ADD_TODO',
      payload: newTodo,
    });

    setContent('');
  };

  return (
    <>
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input
              className='new-todo'
              placeholder='What needs to be done?'
              autoFocus
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </form>
        </header>

        <List todos={todos} />
      </section>

      <footer className='info'>
        <p>
          Modified by{' '}
          <a href='https://github.com/dogancanulgu'>Doğancan Ülgü</a>
        </p>
      </footer>
    </>
  );
};

export default App;
