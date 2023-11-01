import { ChakraProvider, theme ,ColorModeScript} from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import {BrowserRouter} from 'react-router-dom'
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {SearchProvider} from "./context/search.jsx"
import "./index.css"
import { AuthProvider } from './context/auth';
import {CartProvider} from "./context/cart.jsx"
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
  <BrowserRouter>
   <StrictMode>
    
    <ColorModeScript/>

<ChakraProvider theme={theme} >

 <App />

  
</ChakraProvider>
  </StrictMode>
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  
  </AuthProvider>
);


