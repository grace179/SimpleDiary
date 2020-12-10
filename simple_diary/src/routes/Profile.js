import React from 'react';
import { authService } from '../fBase';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const history = useHistory();

    const onLogOut = () => {
        authService.signOut();
        history.push("/");    

    };
    return (
        <div>
            <LogOutBtn onClick={onLogOut}>Log Out</LogOutBtn>
        </div>
    );
}

const LogOutBtn = styled.button`
    width: 50%;
    border-radius: 30px;
    padding: 10px;
    background: #fff;
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
