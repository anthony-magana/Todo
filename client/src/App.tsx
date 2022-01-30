import React from 'react';
import { Box } from '@chakra-ui/react'
import Header from './components/Header';
import TodoList from './components/TodoList';

function App() {
  return (
    <Box m='1rem'>
      <Header />
      <TodoList todos={[{title: 'hello world', description: 'it is a lovely day', completed: false}, {title: 'garbage', description:'Take out garbage', completed: true}]} />
    </Box>
  );
}

export default App;
