import React from 'react';
import { Box } from '@chakra-ui/react';
import Todos from './Todos';
import { useTodoContext } from '../context/TodoProvider';


const TodoList = () => {
  const { todos } = useTodoContext();
  return (
    <Box mt='55px' mb='15px' ml='10%' mr='10%'>
        {todos.map((todo, idx) => (
            <Box key={idx}>
                <Todos id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} />
            </Box>
        ))}
    </Box>
  );
};

export default TodoList;
