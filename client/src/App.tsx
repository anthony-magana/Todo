import React, {useState, useEffect} from 'react';
import { Box, Button, Text} from '@chakra-ui/react'
import Header from './components/Header';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodoContext } from './context/TodoProvider';

function App() {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { setDbTodos } = useTodoContext();
  const handleAuthenticated = (b: boolean) => {
    if(b) {
      setLogin(false);
      setSignUp(false);
      setAuthenticated(b);
    }
  }

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          const data = await response.json();
          console.log(data);
          if(data.user) {
            setAuthenticated(true);
            setName(data.user.name);
            setDbTodos(data.todos);
          }
        } catch(err) {
          console.log(err);
        }
      })();
  }, [authenticated]);
  
  const handleLogout = async () => {
    setAuthenticated(false);
    setName('');
    await fetch(`${process.env.REACT_APP_ENDPOINT}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
  }

  return (
    <Box m='1rem'>
      <Header /> 
      <Box mt='100px' textAlign='center'> 
        <Box display='flex' flexDir='column' m='0 auto' width='50%'>
          { !signUp && !login && !authenticated && <Button onClick={() => setLogin(true)}>Have an Account? sign in</Button>}
          { !signUp && !login && !authenticated && <Button mt='15px' onClick={() => setSignUp(true)}>Don't have an account? sign up</Button>}
        </Box>
        {signUp && !authenticated && <Signup auth={handleAuthenticated} />}
        {signUp && !authenticated && <Button w='300px' onClick={() => setSignUp(false)}>Go back?</Button>}
        {login && !authenticated && <Signin auth={handleAuthenticated} />}
        {login && !authenticated && <Button w='300px' onClick={() => setLogin(false)}>Go back?</Button>}
      </Box>

      {authenticated && 
        <Box mt='100px'>
          <Box display='flex' justifyContent='space-around' mb='10'>
            <Text textAlign='center' fontSize='large'> hi {name}, add some todos!</Text>
            <Button onClick={handleLogout}>Logout?</Button>
          </Box>
          <TodoForm />
          <TodoList />
        </Box>
      }
    </Box>
  );
}

export default App;
