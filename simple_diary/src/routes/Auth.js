import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fBase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event)=>{
        // console.log(event.target.name);
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
        
            let data;

            if(newAccount){
                // Create Account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                // LogIn
                data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccount((prev)=>!prev);
    };
    const onGoogleClick = async (event) => {
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data =  await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <input name="email" type="email" placeholder="Email" required value={email}
                onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Login"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In":"Create Account"}</span>
            <div>
                <button onClick={onGoogleClick}>Continue with Google</button>
            </div>
        </div>
    );
}

export default Auth;
