import React from 'react';
import { Todo } from '../types/Todo';
import { Box } from '@chakra-ui/react';
import Todos from './Todos';

type Props = {
    todos: Todo[]
}

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <Box mt='55px' mb='15px' ml='10%' mr='10%'>
        {todos.map((todo, idx) => (
            <Box key={idx}>
                <Todos title={todo.title} description={todo.description} completed={todo.completed} />
            </Box>
        ))}
    </Box>
  );
};

export default TodoList;
