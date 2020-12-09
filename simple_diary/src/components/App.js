import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';
import styled from 'styled-components';


function App() {

  console.log(authService.currentUser);

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
    // console.log(user)
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });

    return () => {
    };
  }, []);

  return (
    <Container>
      {init ? 
        <AppRouter isLoggedIn={isLoggedIn}/>
        : "Initializing"}
    </Container>
  );
}


const Container = styled.div`
    max-width: 350px;
    min-height: 80vh;
    background-color: #fff;
    padding: 30px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-align: center;
`;

export default App;
