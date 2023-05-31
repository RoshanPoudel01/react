import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import chakraTheme from '@chakra-ui/theme'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './helper/Router';
import { theme } from './theme';
const { Button,Heading,Input,Text,FormControl,FormLabel,FormErrorMessage,Table,TableContainer} = chakraTheme.components

// const theme = extendBaseTheme({
//   components: {
//     Button,
//     Heading,
//     Input,
//     Text, FormControl, FormLabel
//     , FormErrorMessage,Table,TableContainer
    
//   },
// })


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <ChakraProvider theme={theme}>
    <RouterProvider router={router} >

    <App />
    </RouterProvider>
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
