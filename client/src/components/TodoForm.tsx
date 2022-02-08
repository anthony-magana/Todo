import React, {useState} from 'react';
import { Input, Box, Button, InputGroup, Text } from '@chakra-ui/react';
import { useTodoContext } from '../context/TodoProvider';

const TodoForm = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { addTodo } = useTodoContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTitle('')
        setDescription('')
        addTodo({title, description})
    }
    
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Box width='55%' m='0 auto' mt='3'>
                <InputGroup>
                    <Text width='150px'>Title: </Text>
                    <Input type="text" placeholder="Add Todo title" value={title} onChange={(e) => {setTitle(e.target.value)}} required/>
                </InputGroup>
                <InputGroup>
                    <Text width='150px'>Description: </Text>
                    <Input type="text" placeholder="Add Todo description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
                </InputGroup>
            </Box>
            <Box textAlign='center' m='0 auto' mt='3' maxWidth='55%'>
                <Button width='100%' type="submit">Add</Button>
            </Box>
        </form>
    </>
  );
};

export default TodoForm;
