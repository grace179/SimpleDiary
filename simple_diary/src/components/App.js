import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';
import styled from 'styled-components';
import Spinner from './Spinner';
import Footer from './Footer';

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
      <>
        <AppRouter 
        isLoggedIn={Boolean(userObj)}
        refreshUser={refreshUser}
        userObj={userObj}/>
        <Footer/>
      </>
        : <Spinner/>}
    </Container>
  );
}


const Container = styled.div`
    min-width: 350px;
    max-width: 1200px;
    min-height: 80vh;
    background-color: #fff;
    box-sizing: border-box;
    margin: 0 auto;
`;

export default App;
