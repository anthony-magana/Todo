import React from 'react';
import ToggleColorMode from './ToggleColorMode';
import { Heading, Box } from '@chakra-ui/react'

const Header = () => {
  return (
    <header>
        <Box mb='2' display='flex' alignItems='center' justifyContent='space-between'>
            <Heading as='h1' size='2xl'> Todo App </Heading>
            <ToggleColorMode />
        </Box>
    </header>
  );
};

export default Header;
