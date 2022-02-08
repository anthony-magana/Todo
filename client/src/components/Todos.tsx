import React from 'react';
import { Todo } from '../types/Todo';
import { Box, Checkbox, Heading, useColorMode, IconButton } from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import { useTodoContext } from '../context/TodoProvider';

type props = {
    id: Todo['id'],
    description: Todo["description"],
    title: Todo["title"],
    completed: Todo["completed"],
}

const Todos: React.FC<props> = ({title, description, completed, id}) => {
  const { colorMode } = useColorMode();
  const bgColor = (colorMode === 'light' ? 'gray.100' : 'gray.700')
  const borderColor = (colorMode === 'light' ? 'blue.300' : 'blue.600')
  const { removeTodo, updateCompleted } = useTodoContext();

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this todo?') && id) {
      removeTodo(id);
    }
  }

  const handleCheckbox = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if(id) {
      updateCompleted(id, e.target.checked);
    }
  }

  return (
    <Box as='article' display='flex' w='70%' m='0 auto' alignItems='center' alignContent='center' justifyContent='space-between' mt='25px' backgroundColor={bgColor} p='20px'>
        <Box as='section' pr='25px' flexWrap='wrap'>
            <Heading as='h3' size='md' mb='5px'>Title: {title}</Heading>
            <Box as='p'>Description: {description}</Box>
            {completed && <Box as='p' color='green.500'>{completed}</Box>}
        </Box>
        <Box as='section' display='flex' alignItems='center'>
            <Checkbox borderColor={borderColor} checked={completed} onChange={handleCheckbox}  mr='10' />
            <IconButton icon={<DeleteIcon />} aria-label='delete' onClick={handleDelete} size='sm' color='red.500'/>
        </Box>
    </Box>
  );
};

export default Todos;
