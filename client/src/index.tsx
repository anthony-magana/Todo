import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoProvider from './context/TodoProvider';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <TodoProvider>
        <App />
      </TodoProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
