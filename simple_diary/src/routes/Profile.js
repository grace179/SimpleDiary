import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fBase';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Profile = ({refreshUser,userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOut = () => {
        authService.signOut();
        history.push("/");    

    };

    const onChange = (event) => {
        const {target: {value},} = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
            // console.log(response);
            // console.log(userObj.updateProfile);
        }
    }
    return (
        <Contain>
            <form onSubmit={onSubmit}>
                <TextInput type="text" placeholder="Display UserName" onChange={onChange}
                maxLength={10}/>
                <UpdateBtn type="submit" value="Update" />
            </form>
            <LogOutBtn onClick={onLogOut}>Log Out</LogOutBtn>
        </Contain>
    );
}

const Contain = styled.div`
    text-align: center;
`;

const TextInput = styled.input`
    width: 45%;
    padding: 0.8em;
    margin-bottom: 1em;
    margin-right: 0.5em;
    border: 2px solid #FADCF3;
    border-radius: 5px;
    &:focus{
        border: 2px solid #FADC;
        outline: 0 none;
    }
        
    `;
const UpdateBtn = styled.input`
    font-weight: 500;
    font-size: 0.9em;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 1;

    &:hover{
        opacity: 0.7;
    }
    &:focus{
        outline:0 none;
    }

`;
const LogOutBtn = styled.button`
    width: 50%;
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

export default Profile;
