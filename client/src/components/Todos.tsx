import React from 'react';
import { Todo } from '../types/Todo';
import { Box, Checkbox, Heading } from '@chakra-ui/react';

const Todos: React.FC<Todo> = ({title, description, completed}) => {
  return (
    <Box as='article' display='flex' alignItems='center' alignContent='center' justifyContent='space-between' mt='25px' backgroundColor='gray.700' p='20px'>
        <Box as='section' pr='25px'>
            <Heading as='h3' size='md' mb='5px'>{title}</Heading>
            <Box as='p'>{description}</Box>
        </Box>
        <Box as='section'>
            <Checkbox isChecked={completed} />
        </Box>
    </Box>
  );
};

export default Todos;
