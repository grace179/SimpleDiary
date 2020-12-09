import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';

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
    <div>
      {init ? 
        <AppRouter isLoggedIn={isLoggedIn}/>
        : "Initializing"}
    </div>
  );
}

export default App;
