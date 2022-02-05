import React, {useState, useEffect} from 'react';
import { Box, Button, Text} from '@chakra-ui/react'
import Header from './components/Header';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TodoForm from './components/TodoForm';

function App() {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [name, setName] = useState<string>('');

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
          const response = await fetch('http://localhost:5000/api/user', {
            method: 'GET',
            credentials: 'include'
          });

          const data = await response.json();
          console.log(data);
          if(data.id) {
            setAuthenticated(true);
            setName(data.name);
          }
        } catch(err) {
          console.log(err);
        }
      })();

  }, [])
  
  const handleLogout = async () => {
    setAuthenticated(false);
    setName('');
    await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
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
        </Box>
      }
    </Box>
  );
}

export default App;
