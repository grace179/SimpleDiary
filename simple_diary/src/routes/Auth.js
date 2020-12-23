import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fBase';
import styled from 'styled-components';

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
        <Container>

            <form onSubmit={onSubmit}>

                <input name="email" type="email" placeholder="Email" required value={email}
                onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                onChange={onChange}/>
                <SubmitInput type="submit" value={newAccount ? "Create Account" : "Login"}
                />
                {error}
            </form>
            
                <button onClick={onGoogleClick}>Continue with Google</button>
            
            <span onClick={toggleAccount}>{newAccount ? "Sign In":"Create Account"}</span>

        </Container>
    );
}

const Container = styled.div`
    max-width: 350px;
    min-height: 80vh;
    background-color: #fff;
    margin: 20px auto;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    text-align: center;

    span{
        text-align: right;
        margin-top: 1em;
        font-weight: 600;
        cursor: pointer;
        opacity: 1;

        &:hover{
            opacity: 0.7;
        }
    }

    input{
        width: 90%;
        padding: 0.7em;
        margin-bottom: 1em;
        border-radius: 30px;
        border: 2px solid #FADCF3;
        &:focus{
            outline:0 none;}
        }

    }

    button{
        width: 90%;
        border-radius: 30px;
        padding: 10px;
        background: #FADCF3;
        border: 2px solid #FADCF3;
        cursor: pointer;
        opacity: 1;

        &:hover{
            opacity: 0.7;
        }
        &:focus{
            outline:0 none;}
        }

    `;
const SubmitInput = styled.input`
    padding: 0.7em;
    margin-bottom: 1em;
    border-radius: 30px;
    border: 2px solid #FADCF3;
    background-color: #FADCF3;
    cursor: pointer;

    &:hover{
        background: #fff;
        border: 2px solid #FADCF3;
    }
    &:focus{
        outline:0 none;}
    }
`;

export default Auth;
