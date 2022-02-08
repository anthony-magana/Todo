import React, {useState} from 'react';
import { Box, Heading, Input, Button } from '@chakra-ui/react'

type Props = {
  auth: (b: boolean) => void
}

const Signin:React.FC<Props> = ({auth}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await res.json();
      console.log("signin data: ", data)
      if(data.message === 'Success'){
        auth(true);
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <Box m='1rem' textAlign='center'>
        <form onSubmit={handleSubmit}>
            <Heading as='h2' size='lg' mt='3'>Sign In</Heading>
            <Box width='50%' m='0 auto' mt='3'>
                <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                <Input type='password' placeholder='Password' mt='3' onChange={(e) => setPassword(e.target.value)} required/>
            </Box>
            <Button w='300px' type='submit' mt='3'>Sign In</Button>
        </form>
    </Box>
  )
};

export default Signin;
