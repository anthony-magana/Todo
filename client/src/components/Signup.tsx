import React, {useState} from 'react';
import { Box, Heading, Input, Button } from '@chakra-ui/react'

type Props = {
    auth: (b: boolean) => void
}

const Signup:React.FC<Props> = ({auth}) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_ENDPOINT}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const data = await res.json();
            if(data.id)
                auth(true);
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <Box m='1rem' textAlign='center'>
        <form onSubmit={handleSubmit}>
            <Heading as='h2' size='lg' mt='3'>Sign Up</Heading>
            <Box width='50%' m='0 auto' mt='3'>
                <Input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}  required/>
                <Input type='email' placeholder='Email' mt='3' onChange={(e) => setEmail(e.target.value)} required/>
                <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} mt='3' required/>
            </Box>
            <Button w='300px' type='submit' mt='3'>Sign Up</Button>
        </form>
    </Box>
  )
};

export default Signup;
