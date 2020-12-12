import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';
import styled from 'styled-components';

function App() {

  console.log(authService.currentUser);

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
    // console.log(user)
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args)=>user.updateProfile(args),
        });
        
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args)=>user.updateProfile(args),
    });
  }

  return (
    <Container>
      {init ? 
        <AppRouter 
        isLoggedIn={Boolean(userObj)}
        refreshUser={refreshUser}
        userObj={userObj}/>
        : "Initializing"}
    </Container>
  );
}


const Container = styled.div`
    max-width: 350px;
    min-height: 80vh;
    background-color: #fff;
    padding: 10px;
    margin: 20px auto;
    border-radius: 5px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    text-align: center;
`;

export default App;
